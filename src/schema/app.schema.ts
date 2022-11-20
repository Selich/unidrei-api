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
export class CreatePrivateTwinRedeemInput {
  @Field()
  id: string;

  @Field()
  image?: string;

  @Field()
  typeIri: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  collectionId: string;

  @Field()
  link: string;

  @Field()
  tags: string;

  @Field((type) => [PrivateTwinFlatAttributes])
  flatAttributes: PrivateTwinFlatAttributes[];

  @Field((type) => [PrivateTwinComposedAttributes])
  composedAttributes: PrivateTwinComposedAttributes[];
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
class PrivateTwinFlatAttributes {
  @Field(() => String)
  propertyIri: string;

  @Field(() => String)
  propertyValue: string;
}

@InputType()
export class MintTwinInput {
  @Field(() => String)
  targetAddress: string;

  @Field(() => String)
  targetTwinId: string;
}

@InputType()
export class PrivateTwinComposedAttributes {
  @Field(() => String)
  propertyIri: string;

  @Field(() => [PrivateTwinSubAttributes])
  subProperties: PrivateTwinSubAttributes[];
}

@InputType()
export class PrivateTwinSubAttributes {
  @Field(() => String)
  propertyIri: string;

  @Field(() => String)
  propertyValue: string;
}

@ObjectType()
export class PrivateTwinSubAttributesOutput {
  @Field(() => String)
  propertyIri: string;

  @Field(() => String)
  propertyValue: string;
}

@ObjectType()
export class PrivateTwinComposedAttributesOutput {
  @Field(() => String)
  propertyIri: string;

  @Field(() => [PrivateTwinSubAttributesOutput])
  subProperties: PrivateTwinSubAttributesOutput[];
}

@ObjectType()
export class RedemptionOffer {
  @Field(() => String)
  id: string;

  @Field(() => String)
  dateClaimed?: string;

  @Field(() => Boolean)
  available: boolean;

  @Field(() => String)
  offeredBy: string;

  @Field(() => String)
  twinRecipe: string;

  @Field(() => String)
  signature: string;

  @Field(() => String)
  creatorId: string;
}

@ObjectType()
class PrivateTwinFlatAttributesOutput {
  @Field(() => String)
  propertyIri: string;

  @Field(() => String)
  propertyValue: string;
}

@ObjectType()
export class RedeemParsedOutput {
  @Field()
  image?: string;

  @Field()
  typeIri?: string;

  @Field()
  contractAddress?: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  collectionId?: string;

  @Field()
  link: string;

  @Field()
  id?: string;

  @Field()
  userId?: string;

  @Field()
  tags?: string;

  @Field((type) => [PrivateTwinFlatAttributesOutput])
  flatAttributes?: PrivateTwinFlatAttributesOutput[];

  @Field((type) => [PrivateTwinComposedAttributesOutput])
  composedAttributes?: PrivateTwinComposedAttributesOutput[];
}

@ObjectType()
export class MintedTwinProperties {
  @Field()
  tokenId: string;

  @Field()
  contractId: string;

  @Field()
  contractNetwork: string;

  @Field()
  contractBlockchain: string;

  @Field()
  mintTx: string;

  @Field()
  ownerWallet: string;
}

@ObjectType()
export class MintedTwinSellOffer {
  @Field()
  tokenContract: string;

  @Field()
  amount: string;

  @Field()
  offerer: string;

  @Field()
  offererId: string;

  @Field()
  saleInformation: string;
}

@ObjectType()
export class MintedTwinBuyOffer {
  @Field()
  tokenContract: string;

  @Field()
  amount: string;

  @Field()
  offerer: string;

  @Field()
  serializedOffer: string;

  @Field()
  endDate: number;
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
export class ERC721Twin {
  @Field()
  image: string;

  @Field()
  external_url: string;

  @Field()
  name: string;

  @Field()
  background_color: string;

  @Field()
  animation_url: string;

  @Field()
  youtube_url: string;

  @Field(() => [ERC721Attributes])
  attributes: ERC721Attributes[];
}

@ObjectType()
export class ERC721Attributes {
  @Field({ nullable: true })
  display_type: string;

  @Field()
  trait_type: string;

  @Field()
  value: string;
}

@ObjectType()
export class additionalProperty {
  @Field()
  name: string;

  @Field()
  value: string;

  @Field()
  type: string;
}

@ObjectType()
export class DocumentEntityResponse {
  @Field({ nullable: true })
  data: Document;
}

@ObjectType()
export class PrivateTwin {
  @Field() // <-- GraphQL type
  _id: string;

  @Field()
  tokenId: string;

  @Field()
  typeIri: string;

  @Field(() => ID)
  userId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  condition: string;

  @Field()
  link: string;

  @Field()
  image: string;
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
