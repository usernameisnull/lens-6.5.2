/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

const defaultLeaveDurationForAnimatedInjectable = getInjectable({
  id: "default-leave-duration-for-animated",
  instantiate: () => 100,
});

export default defaultLeaveDurationForAnimatedInjectable;
