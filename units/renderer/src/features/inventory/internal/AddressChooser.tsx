import React from 'react';
import classNames from 'classnames/bind';
import styles from './AddressChooser.module.scss';

const cx = classNames.bind(styles);

export type AddrItem = { id: number | string, name: string, text: string };
export interface IAddressChooserProps {
  items: Array<AddrItem>;
  onItemChange?: (item: AddrItem) => void;
  activeItem: AddrItem | null | undefined;
};

export const AddressChooser: React.FC<IAddressChooserProps> = React.memo(props => {
  const { items, onItemChange, activeItem } = props;

  return (
    <div className={cx("scroll-window")}>
      <div className={cx("container")}>

        {items.map(item => (
          <div
            key={item.id}
            className={cx("item", { "active": item.id === activeItem?.id })}
            onClick={() => onItemChange?.(item)}
          >
            <span className={cx("title")}>{item.name}</span>
            <div className={cx("content")}>{item.text}</div>
          </div>
        ))}
        {/*<div className={cx("item")}>
          <span className={cx("title")}>Store 1</span>
          <div className={cx("content")}>
            Street:  Funkevanget 12
            City:  Frederiksberg C
            State/province/area:   Region Sjælland
            Phone number  53-39-27-91
            Zip code  1910
            Country calling code  +45
            Country  Denmark
          </div>
        </div>*/}

      </div>
    </div>
  );
});
