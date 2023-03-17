import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FamiliesModule } from './families/families.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configs } from 'config/configuration';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    FamiliesModule,
    MembersModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: configs.mongoUrl,
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
