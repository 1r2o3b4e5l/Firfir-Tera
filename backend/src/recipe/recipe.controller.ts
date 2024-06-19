import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Headers,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../Upload/multer.config';
import { UploadService } from '../Upload/upload.service';
import { Category, Recipe } from '../schemas/recipe.schema';
import { createRecipeDto, updateRecipeDto } from '../dto/recipe.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Role } from '../entities/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipeService.showAll();
  }

  @Post('new')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @Roles(Role.COOK)
  @Roles(Role.ADMIN)
  async createRecipe(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('cookTime') cookTime: number,
    @Body('people') people: number,
    @Body('ingredients') ingredients: string[],
    @Body('steps') steps: string[],
    @Body('fasting') fasting: string,
    @Body('type') type: Category,
    @UploadedFile() file: Express.Multer.File,
    @Headers('Authorization') authorization: string,
  ): Promise<Recipe> {
    this.uploadService.uploadFile(file);

    const serverBaseURL = 'http://10.0.2.2:3000/uploads/';
    const filePath = `${serverBaseURL}${file.filename}`;
    const createdRecipe = await this.recipeService.insertRecipe(
      {
        name,
        description,
        cookTime,
        people,
        ingredients,
        steps,
        fasting,
        type,
        image: filePath,
        cook_id: '1',
      },
      authorization,
    );
    return createdRecipe;
  }

  @Get('query')
  async search(@Query() query: ExpressQuery): Promise<Recipe[]> {
    console.log(query, query.category);
    if (query.category == 'All') {
      return this.recipeService.showAll();
    }
    return this.recipeService.find(query);
  }
  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    console.log(prodId);
    return await this.recipeService.getSingleRecipe(prodId);
  }

  @Get('myrecipes/:cookId')
  @Roles(Role.COOK)
  async getRecipesByCookId(@Param('cookId') cookId: string): Promise<Recipe[]> {
    console.log(cookId);
    return this.recipeService.getRecipesByCookId(cookId);
  }

  @Get(':title')
  async searchRecipe(@Param('title') title: string): Promise<Recipe[]> {
    return this.recipeService.searchByTitle(title);
  }

  @Get('category/:fasting')
  async getFasting(@Param('fasting') fasting) {
    if (fasting === 'true' || fasting === 'false') {
      return await this.recipeService.getFasting(fasting);
    } else {
      return await this.recipeService.getByType(fasting);
    }
  }

  // @Patch(':id')
  // @Roles(Role.COOK)

  // async updateRecipe(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   recipe: updateRecipeDto
  // ): Promise<Recipe> {
  //   console.log("the id is-",id)
  //   return this.recipeService.updateById(id, recipe)
  // }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @Roles(Role.COOK)
  @Roles(Role.ADMIN)
  async updateRecipe(
    @Param('id') recipeId,
    @Body('name') recipeName: string,
    @Body('description') recipeDesc: string,
    @Body('cookTime') cooktime: number,
    @Body('people') people: number,
    @Body('ingredients') ings: string[],
    @Body('steps') steps: string[],
    @Body('fasting') fasting: string,
    @Body('type') type: Category,
    @UploadedFile() file: Express.Multer.File,
    @Headers('Authorization') authorization: string,
  ) {
    const serverBaseURL = 'http://10.0.2.2:3000/uploads/';
    let filePath;
    if (file) {
      this.uploadService.uploadFile(file);
      const filePath = `${serverBaseURL}${file.filename}`;
    }

    return await this.recipeService.updateRecipe({
      recipeId,
      recipeName,
      recipeDesc,
      cooktime,
      people,
      steps,
      ings,
      fasting,
      type,
      image: filePath,
    });
  }

  @Delete(':id')
  @Roles(Role.COOK)
  async deleteRecipe(
    @Param('id')
    id: string,
  ): Promise<Recipe> {
    return this.recipeService.deleteById(id);
  }
}
