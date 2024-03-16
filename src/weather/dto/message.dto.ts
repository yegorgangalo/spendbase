import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({
    example: ['added', 'updated', 'no data'],
    description: 'message about request status',
  })
  message: string;
}
