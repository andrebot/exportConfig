// Define the shape of the configuration object
interface ConfigObject {
  /**
   * Default configuration regardless the environment you are in
   */
  default?: Record<string, any>;
  /**
   * Environment configuration
   */
  [env: string]: Record<string, any> | undefined;
  /**
   * Required configuration for all environments
   */
  required?: string[];
}

declare function ExportConfig(configObj: ConfigObject): Record<string, any>;

export = ExportConfig;
