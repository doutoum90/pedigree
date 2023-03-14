import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FamiliesModule } from './families/families.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configs } from 'config/configuration';

@Module({
  imports: [
    FamiliesModule,
    MongooseModule.forRoot(configs.mongoUrl, {
      autoCreate: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
