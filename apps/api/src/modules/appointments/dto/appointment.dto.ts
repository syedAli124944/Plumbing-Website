import { IsEnum, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type ServiceType = 'EMERGENCY' | 'DRAIN_CLEANING' | 'WATER_HEATER' | 'LEAK_DETECTION' | 'TOILET_REPAIR' | 'SEWER_LINE' | 'PIPE_REPLACEMENT' | 'COMMERCIAL' | 'OTHER';
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

const SERVICE_TYPES: ServiceType[] = ['EMERGENCY', 'DRAIN_CLEANING', 'WATER_HEATER', 'LEAK_DETECTION', 'TOILET_REPAIR', 'SEWER_LINE', 'PIPE_REPLACEMENT', 'COMMERCIAL', 'OTHER'];
const APPOINTMENT_STATUSES: AppointmentStatus[] = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export class CreateAppointmentDto {
  @ApiProperty() @IsString() customerId!: string;
  @ApiProperty({ enum: SERVICE_TYPES }) @IsEnum(SERVICE_TYPES) serviceType!: ServiceType;
  @ApiProperty() @IsDateString() scheduledAt!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() technicianNote?: string;
}

export class CreatePublicAppointmentDto {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty() @IsString() email!: string;
  @ApiProperty() @IsString() phone!: string;
  @ApiProperty() @IsString() address!: string;
  @ApiProperty({ enum: SERVICE_TYPES }) @IsEnum(SERVICE_TYPES) serviceType!: ServiceType;
  @ApiProperty() @IsDateString() scheduledAt!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ enum: APPOINTMENT_STATUSES }) @IsOptional() @IsEnum(APPOINTMENT_STATUSES) status?: AppointmentStatus;
  @ApiPropertyOptional() @IsOptional() @IsDateString() scheduledAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() technicianNote?: string;
}
