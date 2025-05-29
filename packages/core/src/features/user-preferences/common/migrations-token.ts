/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getInjectionToken } from "@ogre-tools/injectable";
import type { MigrationDeclaration } from "../../../common/persistent-storage/migrations.injectable";

export const userPreferencesMigrationInjectionToken = getInjectionToken<MigrationDeclaration>({
  id: "user-preferences-migration-token",
});
