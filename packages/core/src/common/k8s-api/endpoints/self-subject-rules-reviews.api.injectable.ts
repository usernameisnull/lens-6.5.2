/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { SelfSubjectRulesReviewApi } from "./self-subject-rules-reviews.api";
import { kubeApiInjectionToken } from "../kube-api/kube-api-injection-token";
import { loggerInjectionToken } from "@k8slens/logger";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const selfSubjectRulesReviewApiInjectable = getInjectable({
  id: "self-subject-rules-review-api",
  instantiate: (di) => {
    assert(di.inject(storesAndApisCanBeCreatedInjectionToken), "selfSubjectRulesReviewApi is only available in certain environments");

    return new SelfSubjectRulesReviewApi({
      logger: di.inject(loggerInjectionToken),
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default selfSubjectRulesReviewApiInjectable;
