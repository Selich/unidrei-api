import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AppResolver } from 'src/resolvers/app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      dateScalarMode: 'timestamp',
      numberScalarMode: 'integer',
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
      uploads: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
