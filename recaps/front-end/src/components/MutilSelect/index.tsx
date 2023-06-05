import * as React from 'react';
import trim from 'lodash/trim';
import upperCase from 'lodash/upperCase';
import CheckBox from '@ui/CheckBox';
import InvisibleBackdrop from '@ui/Backdrop/InvisibleBackdrop';
import { InputGroup } from 'reactstrap';
import Input from '@ui/Inputs/Input';
import images from 'assets/images';
import cx from 'classnames';
import classes from './mutil-select.module.scss';

interface ItemOptions {
  label: string;
  value: string;
}

interface State {
  focused: boolean;
  filteredOptions: ItemOptions[];
  isSelectedAll: boolean;
}

interface Props {
  fieldName: string;
  options: ItemOptions[];
  value: ItemOptions[];
  onChange: (value: ItemOptions[], key: string) => void;
  labelSelectAll?: string;
  hideSearch?: boolean;
  onBlur?: () => void;
  placeholder?: string;
}

class MultiSelect extends React.Component<Props, State> {
  selectRef: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false,
      filteredOptions: [...this.props.options],
      isSelectedAll: false,
    };
  }

  componentDidMount() {
    const { options, value } = this.props;
    if (value.length === options.length) {
      this.setState({ isSelectedAll: true });
    }
  }

  handleChangeSelectedAllValue = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const { isSelectedAll } = this.state;
    const { onChange, fieldName, options } = this.props;
    if (isSelectedAll) {
      onChange([], fieldName);
    } else {
      onChange(options, fieldName);
    }
    this.setState({ isSelectedAll: !isSelectedAll });
  };

  handleChangeSelectedValue = async (e: React.SyntheticEvent<EventTarget>, objectData: ItemOptions) => {
    e.preventDefault();
    const { onChange, fieldName, value } = this.props;
    const findObjectData: any = value.find((it: ItemOptions) => it.value === objectData.value);

    if (findObjectData) {
      const newValueSeleceted = value.filter((it: ItemOptions) => it.value !== findObjectData.value);
      this.handleCheckSelectedAll(newValueSeleceted.length);
      onChange(newValueSeleceted, fieldName);
    } else {
      const newValueSeleceted = [...value, ...[objectData]];
      this.handleCheckSelectedAll(newValueSeleceted.length);
      onChange(newValueSeleceted, fieldName);
    }
  };

  handleCheckSelectedAll = (selectedLength: number) => {
    const { options } = this.props;
    const { isSelectedAll } = this.state;
    if (options.length === selectedLength) {
      this.setState({ isSelectedAll: true });
    } else if (isSelectedAll) {
      this.setState({ isSelectedAll: false });
    }
  };

  checkSelected = (itemValue: string) => {
    const { value } = this.props;
    return value.filter((it: ItemOptions) => it.value === itemValue).length > 0;
  };

  renderListOptions = () => {
    const { filteredOptions, isSelectedAll } = this.state;
    const { labelSelectAll } = this.props;

    const renderFilteredOptions =
      filteredOptions && filteredOptions.length > 0
        ? filteredOptions.map((item: ItemOptions, idx: number) => {
            return (
              <div
                key={item.value || idx}
                className={classes.itemSelect}
                onClick={(e: React.SyntheticEvent<EventTarget>) => {
                  this.handleChangeSelectedValue(e, item);
                }}>
                <CheckBox className={classes.customCheckbox} checked={this.checkSelected(item.value) || false} />
                <span className={`${this.checkSelected(item.value) && 'active'}`}>{item.value}</span>
              </div>
            );
          })
        : null;

    return (
      <>
        {filteredOptions?.length && (
          <div
            className={classes.itemSelect}
            onClick={(e: React.SyntheticEvent<EventTarget>) => this.handleChangeSelectedAllValue(e)}>
            <CheckBox checked={isSelectedAll} />
            <span className={`${isSelectedAll && 'active'}`}>{labelSelectAll || 'Select All'}</span>
          </div>
        )}

        {renderFilteredOptions}
      </>
    );
  };

  handleShowOptions = () => {
    this.setState({ focused: true });
  };

  handleHideOptions = () => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  handleFilterListOptions = (stringValue: string) => {
    const { options } = this.props;
    const filteredOptions = options.filter((item) => upperCase(item.label).includes(trim(upperCase(stringValue))));
    this.setState({ filteredOptions });
  };

  render() {
    const { focused } = this.state;
    const { value, hideSearch } = this.props;

    return (
      <div className={classes.multiSelectContainer}>
        <div onClick={this.handleShowOptions} className={classes.dataSelected}>
          <div className={classes.selectedValue}>{value ? value.map((it) => it.label).join(', ') : ''}</div>

          <img
            className={cx(classes.wrapImage, focused && classes.rotate180)}
            src={images.icArrowFilterSelect}
            alt=""
          />
        </div>

        {focused && (
          <InvisibleBackdrop onClick={this.handleHideOptions}>
            <div className={classes.dropdownContainer}>
              {/* input search */}
              {!hideSearch && (
                <div className={classes.FormGroup}>
                  <InputGroup className={'mb-3'}>
                    <Input
                      placeholder={'Search...'}
                      onChange={(event) => this.handleFilterListOptions(event.target.value)}
                      className={classes.customSearchBox}
                    />
                    <span role="button">
                      <img src={images.messages.icSearchPrimary} alt={''} />
                    </span>
                  </InputGroup>
                </div>
              )}
              {/* end */}

              {/* list select options */}
              <div className={classes.listDropdownSelect}>{this.renderListOptions()}</div>
              {/* end */}
            </div>
          </InvisibleBackdrop>
        )}
      </div>
    );
  }
}

export default MultiSelect;
