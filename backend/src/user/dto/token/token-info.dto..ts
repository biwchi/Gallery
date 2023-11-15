import { ApiProperty } from '@nestjs/swagger';

export class TokenInfoDto {
	constructor(id: number, email: string) {
		this.id = id;
		this.email = email;
	}

	@ApiProperty({ description: 'User ID', example: 123 })
	id: number;

	@ApiProperty({ description: 'User Email', example: 'john@doe.com' })
	email: string;

	@ApiProperty({description: "User name", example: 'John doe'}) 
	name: string
}