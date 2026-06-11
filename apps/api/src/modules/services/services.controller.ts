import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

const SERVICES_DATA = [
  { id: 'emergency', name: 'Emergency Plumbing', slug: 'emergency-plumbing', description: 'Fast 24/7 emergency plumbing response when you need it most.', icon: 'Siren', features: ['60-minute response time', 'Available 24/7/365', 'Licensed emergency technicians'], priceFrom: 149 },
  { id: 'drain-cleaning', name: 'Drain Cleaning', slug: 'drain-cleaning', description: 'Professional drain cleaning using hydro-jetting and camera inspection.', icon: 'Droplets', features: ['Hydro-jetting technology', 'Camera pipe inspection', 'Preventive maintenance plans'], priceFrom: 99 },
  { id: 'water-heater', name: 'Water Heater Repair', slug: 'water-heater-repair', description: 'Expert water heater installation, repair, and maintenance.', icon: 'Flame', features: ['Tank & tankless systems', 'Energy-efficient upgrades', 'Same-day service available'], priceFrom: 129 },
  { id: 'leak-detection', name: 'Leak Detection', slug: 'leak-detection', description: 'Advanced leak detection using thermal imaging and acoustic technology.', icon: 'Search', features: ['Non-invasive detection', 'Thermal imaging technology', 'Accurate leak location'], priceFrom: 199 },
  { id: 'toilet-repair', name: 'Toilet Repair', slug: 'toilet-repair', description: 'Complete toilet repair and replacement services.', icon: 'Wrench', features: ['Running toilet fixes', 'Clog removal', 'New installations'], priceFrom: 89 },
  { id: 'sewer-line', name: 'Sewer Line Repair', slug: 'sewer-line-repair', description: 'Trenchless sewer line repair with minimal property disruption.', icon: 'Construction', features: ['Trenchless technology', 'Camera diagnostics', 'Full line replacement'], priceFrom: 299 },
  { id: 'pipe-replacement', name: 'Pipe Replacement', slug: 'pipe-replacement', description: 'Full pipe replacement and repiping with durable materials.', icon: 'PipetteIcon', features: ['Copper & PEX options', 'Whole-house repiping', 'Warranty included'], priceFrom: 249 },
  { id: 'commercial', name: 'Commercial Plumbing', slug: 'commercial-plumbing', description: 'Commercial plumbing for offices, restaurants, and industrial facilities.', icon: 'Building', features: ['Grease trap installation', 'Backflow prevention', 'Scheduled maintenance'], priceFrom: 199 },
];

@ApiTags('Public')
@Controller('services')
export class ServicesController {
  @Get()
  @ApiOperation({ summary: 'Get all services' })
  findAll() {
    return { success: true, data: SERVICES_DATA };
  }
}
