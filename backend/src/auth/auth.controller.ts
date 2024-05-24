import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import e from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUpNormal(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    if (!signUpDto.role || signUpDto.role == 'normal') {
      signUpDto.role = ['normal'];
      console.log('am here');
      return this.authService.signUp(signUpDto);
    } else if (signUpDto.role == 'cook') {
      signUpDto.role = ['cook'];
      return this.authService.signUp(signUpDto);
    }
    throw new UnauthorizedException('Invalid role');
  }

  @Post('signup/cook')
  signUpCook(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    if (!signUpDto.role || signUpDto.role !== 'cook') {
      throw new UnauthorizedException('Invalid role');
    }
    signUpDto.role = ['cook'];
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
