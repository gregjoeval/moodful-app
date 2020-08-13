import ConfigurationDuck, { SliceModel, SliceState } from './ConfigurationDuck';
import ConfigurationModel, { IConfigurationModel as IConfigurationModelType } from './ConfigurationModel';

const ConfigurationReducer = ConfigurationDuck.Reducer;

export default ConfigurationReducer;
export { ConfigurationDuck, ConfigurationModel };
export type ConfigurationSliceModel = SliceModel;
export type ConfigurationSliceState = SliceState;
export type IConfigurationModel = IConfigurationModelType;
