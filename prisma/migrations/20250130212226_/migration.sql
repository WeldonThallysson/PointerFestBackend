-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "idPlan" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpfCnpj" TEXT,
    "birthDate" TEXT,
    "phone" TEXT,
    "gender" TEXT,
    "complement" TEXT,
    "street" TEXT,
    "city" TEXT,
    "cep" TEXT,
    "region_code" TEXT,
    "number_address" TEXT,
    "neighborhood" TEXT,
    "typeAccess" TEXT NOT NULL DEFAULT 'client',
    "urlSocial" TEXT,
    "image_Logo" TEXT,
    "tutorialFirstAccess" BOOLEAN NOT NULL DEFAULT true,
    "registeredBy" TEXT,
    "typeAccessRegisteredBy" TEXT,
    "cpfRegisteredBy" TEXT,
    "dateRegisteredBy" TEXT,
    "editedBy" TEXT,
    "typeAccessEditedBy" TEXT,
    "cpfEditedBy" TEXT,
    "dateEditedBy" TEXT,
    "termsUsePlatform" BOOLEAN,
    "termsUseLGPD" BOOLEAN,
    "termsReceiptNews" BOOLEAN,
    "termsPrivacyPolicy" BOOLEAN,
    "statusUser" BOOLEAN NOT NULL DEFAULT true,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "idUserOwnerPlan" TEXT NOT NULL,
    "creditsPlan" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "maxEvents" INTEGER,
    "maxChars" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT,
    "themeImageUrl" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commercials" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "idTypeCommercial" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "urlImageCommercial" TEXT NOT NULL,
    "urlSocialMediaCommercial" TEXT,
    "positionOrder" INTEGER,
    "status" BOOLEAN DEFAULT true,
    "created_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "Commercials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typesCommercials" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "created_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "typesCommercials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "idCategory" TEXT NOT NULL,
    "idTypeProduct" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "labelPrice" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "dateRegistered" TEXT NOT NULL,
    "positionOrder" INTEGER,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "allowAddCoupon" BOOLEAN DEFAULT false,
    "status" BOOLEAN DEFAULT true,
    "created_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typesProducts" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "created_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "typesProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "idCategory" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "localityEvent" TEXT NOT NULL,
    "urlLocalityEvent" TEXT NOT NULL,
    "urlPostSocialNetwork" TEXT,
    "bannerImageUrl" TEXT NOT NULL,
    "dateEvent" TEXT NOT NULL,
    "hourEvent" TEXT NOT NULL,
    "placesPurchaseTicket" JSONB,
    "restrictionsEvent" JSONB,
    "phoneForContact" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT,
    "idPromoter" TEXT,
    "idProduct" TEXT,
    "idPlan" TEXT,
    "codeCoupon" TEXT NOT NULL,
    "cpfForUseUnique" TEXT,
    "priceDiscount" DOUBLE PRECISION,
    "isPercentage" BOOLEAN DEFAULT false,
    "commissionPromoter" DOUBLE PRECISION,
    "limitUseMax" INTEGER,
    "limitCouponUsed" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "expirationCoupon" TEXT,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "couponusage" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "idCouponUsed" TEXT NOT NULL,
    "dateLastPaymentComissionCoupon" TEXT,
    "statusComissionPaid" BOOLEAN DEFAULT false,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "couponusage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "methodspayments" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "typeMethodPayment" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "methodspayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "idMethodPayment" TEXT NOT NULL,
    "idProduct" TEXT,
    "idPlan" TEXT,
    "datePayment" TEXT NOT NULL,
    "codePayment" TEXT NOT NULL,
    "codeReferencePayment" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "products" JSONB NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bin" (
    "id" TEXT NOT NULL,
    "idPurchase" TEXT,
    "idMethodsPayments" TEXT,
    "idCommercials" TEXT,
    "idTypeComercials" TEXT,
    "idPlan" TEXT,
    "idCoupon" TEXT,
    "idUser" TEXT,
    "idEvent" TEXT,
    "idCategory" TEXT,
    "idProduct" TEXT,
    "idTypesProducts" TEXT,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "bin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_idPlan_fkey" FOREIGN KEY ("idPlan") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_idUserOwnerPlan_fkey" FOREIGN KEY ("idUserOwnerPlan") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commercials" ADD CONSTRAINT "Commercials_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commercials" ADD CONSTRAINT "Commercials_idTypeCommercial_fkey" FOREIGN KEY ("idTypeCommercial") REFERENCES "typesCommercials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typesCommercials" ADD CONSTRAINT "typesCommercials_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_idTypeProduct_fkey" FOREIGN KEY ("idTypeProduct") REFERENCES "typesProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typesProducts" ADD CONSTRAINT "typesProducts_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_idPlan_fkey" FOREIGN KEY ("idPlan") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_idPromoter_fkey" FOREIGN KEY ("idPromoter") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couponusage" ADD CONSTRAINT "couponusage_idCouponUsed_fkey" FOREIGN KEY ("idCouponUsed") REFERENCES "coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couponusage" ADD CONSTRAINT "couponusage_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "methodspayments" ADD CONSTRAINT "methodspayments_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_idMethodPayment_fkey" FOREIGN KEY ("idMethodPayment") REFERENCES "methodspayments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_idPlan_fkey" FOREIGN KEY ("idPlan") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idPlan_fkey" FOREIGN KEY ("idPlan") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idCoupon_fkey" FOREIGN KEY ("idCoupon") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idEvent_fkey" FOREIGN KEY ("idEvent") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idTypesProducts_fkey" FOREIGN KEY ("idTypesProducts") REFERENCES "typesProducts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idTypeComercials_fkey" FOREIGN KEY ("idTypeComercials") REFERENCES "typesCommercials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idCommercials_fkey" FOREIGN KEY ("idCommercials") REFERENCES "Commercials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idPurchase_fkey" FOREIGN KEY ("idPurchase") REFERENCES "purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin" ADD CONSTRAINT "bin_idMethodsPayments_fkey" FOREIGN KEY ("idMethodsPayments") REFERENCES "methodspayments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
