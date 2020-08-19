# Migration `20200819150842-add-timestamp-to-contribution`

This migration has been generated at 8/19/2020, 3:08:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."contributions" ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200801213043-add-external-id..20200819150842-add-timestamp-to-contribution
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -44,8 +44,9 @@
   email String
   subscriptionId Int? @map("subscription_id")
   subscription ContributionSubscription? @relation(fields: [subscriptionId], references: [id])
   externalId String? @map("external_id")
+  createdAt DateTime @default(now())
   @@map("contributions")
 }
```


