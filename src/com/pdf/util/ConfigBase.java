package com.pdf.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public abstract class ConfigBase {

	private Log log = LogFactory.getLog(ConfigBase.class);
	private Properties p = null;
	
	protected ConfigBase() {
	}
	
	public abstract String getConfigFile();	
	
	private void loadConfig() {
		try {
			InputStream is = this.getClass().getClassLoader().getResourceAsStream(getConfigFile());
			p = new Properties();
			p.load(is);
			is.close();
		}
		catch (IOException ex) {
			log.error("load config file '" + getConfigFile() + "' fail") ;
		}
	}

	public String getConfigValue(String configKey) {
		return getConfigValue(configKey, null);
	}
	
	public String getConfigValue(String configKey, String defaultVal) {
		if (p == null) loadConfig();
		String ret = p.getProperty(configKey);
		if (ret == null) ret = defaultVal;
		return ret;
	}	
}
