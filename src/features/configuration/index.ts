import ConfigurationDuck, { SliceState } from './ConfigurationDuck'
import ConfigurationModel, { IConfigurationModel as ModelType } from './ConfigurationModel'

const ConfigurationReducer = ConfigurationDuck.Reducer

export default ConfigurationReducer
export { ConfigurationDuck, ConfigurationModel }
export type ConfigurationSliceState = SliceState
export type IConfigurationModel = ModelType
