import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('admin')
    adminOnly() {
      return { message: 'Essa rota é para admins apenas' };
    }
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Dados invalidos' };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtectedData(@Request() req) {
    return { message: 'Essa rota é protegida', user: req.user };
  }
}
