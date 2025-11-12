import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.createActivity(createActivityDto);
  }

  @Get()
  findAll(
    @Body()
    filters: {
      userId?: string;
      entityType?: string;
      entityId?: string;
      limit?: number;
    },
  ) {
    return this.activityService.getAllActivities({
      ...filters,
      limit: filters.limit || 50,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.getActivityById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    throw new Error('Not implemented');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.deleteActivity(id);
  }
}
