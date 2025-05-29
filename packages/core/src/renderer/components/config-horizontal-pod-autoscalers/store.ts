/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";
import type { HorizontalPodAutoscalerApi } from "../../../common/k8s-api/endpoints/horizontal-pod-autoscaler.api";
import type { HorizontalPodAutoscaler } from "@k8slens/kube-object";

export class HorizontalPodAutoscalerStore extends KubeObjectStore<HorizontalPodAutoscaler, HorizontalPodAutoscalerApi> {
}
