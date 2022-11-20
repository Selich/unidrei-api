import { Field, ObjectType, ID, InputType, Int } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class ImportDataInput {
  @Field((type) => GraphQLUpload)
  file: FileUpload;

  @Field()
  source: string;
}

@InputType()
export class SignInput {
  @Field()
  signedTxn: string;

  @Field()
  address: string;

  @Field()
  txId: string;
}

@InputType()
export class RequestDocumentInput {
  @Field()
  name: string;

  @Field()
  sign: string;
}

@InputType()
export class PrivateDocumentInput {
  @Field((type) => GraphQLUpload, { nullable: true, defaultValue: null })
  file?: FileUpload;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  link: string;
}

@InputType()
export class MintInput {
  @Field(() => String)
  targetAddress: string;

  @Field(() => String)
  targetId: string;
}

@ObjectType()
export class Document {
  @Field() // <-- GraphQL type
  _id: string; // <-- TypeScript type

  @Field(() => ID)
  ownerIdentifier: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field()
  typeIri: string;

  @Field()
  isMinted: boolean;

  @Field()
  isHidden: boolean;
}
@ObjectType()
export class DocumentEntityResponse {
  @Field({ nullable: true })
  data: Document;
}

@ObjectType()
export class DocumentMintingResponse {
  @Field()
  transactionId: string; //tx.hash

  @Field()
  targetAddress: string; //tx.to

  @Field()
  tokenId: string;

  @Field()
  network: string;

  @Field({ nullable: true })
  twinId?: string;
}
