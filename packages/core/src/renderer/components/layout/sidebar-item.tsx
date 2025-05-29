/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import styles from  "./sidebar-items.module.scss";

import React from "react";
import { computed, makeObservable } from "mobx";
import { cssNames } from "@k8slens/utilities";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import { Icon } from "../icon";
import { withInjectables } from "@ogre-tools/injectable-react";
import type { SidebarStorageState } from "./sidebar-storage/sidebar-storage.injectable";
import sidebarStorageInjectable from "./sidebar-storage/sidebar-storage.injectable";
import type { HierarchicalSidebarItem } from "./sidebar-items.injectable";
import type { StorageLayer } from "../../utils/storage-helper";

interface Dependencies {
  sidebarStorage: StorageLayer<SidebarStorageState>;
}

export interface SidebarItemProps {
  item: HierarchicalSidebarItem;
}

@observer
class NonInjectedSidebarItem extends React.Component<
  SidebarItemProps & Dependencies
> {
  static displayName = "SidebarItem";

  constructor(props: SidebarItemProps & Dependencies) {
    super(props);
    makeObservable(this);
  }

  get id(): string {
    return this.item.id;
  }

  @computed get expanded(): boolean {
    return Boolean(this.props.sidebarStorage.get().expanded[this.id]);
  }

  @computed get isExpandable(): boolean {
    return this.props.item.children.length > 0;
  }

  @computed get isActive(): boolean {
    return this.props.item.isActive.get();
  }

  get item() {
    return this.props.item;
  }

  toggleExpand = () => {
    this.props.sidebarStorage.merge((draft) => {
      draft.expanded[this.id] = !draft.expanded[this.id];
    });
  };

  renderSubMenu() {
    const { isExpandable, expanded } = this;

    if (!isExpandable || !expanded) {
      return null;
    }

    return (
      <ul className={cssNames(styles.subMenu, { [styles.active]: this.isActive })}>
        {this.props.item.children.map(item => <SidebarItem key={item.id} item={item} />)}
      </ul>
    );
  }

  render() {
    return (
      <div
        className={styles.SidebarItem}
        data-testid={`sidebar-item-${this.id}`}
        data-is-active-test={this.isActive}
        data-parent-id-test={this.item.parentId}
      >
        <NavLink
          to={""}
          isActive={() => this.isActive}
          className={styles.navItem}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            if (this.isExpandable) {
              this.toggleExpand();
            } else {
              this.item.onClick();
            }
          }}
          data-testid={`sidebar-item-link-for-${this.id}`}
        >
          {this.item.getIcon?.()}
          <span>{this.item.title}</span>
          {this.isExpandable && (
            <Icon
              className={styles.expandIcon}
              material={
                this.expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"
              }
            />
          )}
        </NavLink>
        {this.renderSubMenu()}
      </div>
    );
  }
}

export const SidebarItem = withInjectables<Dependencies, SidebarItemProps>(NonInjectedSidebarItem, {
  getProps: (di, props) => ({
    ...props,
    sidebarStorage: di.inject(sidebarStorageInjectable),
  }),
});
