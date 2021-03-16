
root['param'] = new Object();

/*
DataCorePlugin.GameRawData.Graphics.Penalty
ACC_PostRaceTime
ACC_DriveThrough_PitSpeeding


This is what I found for ACC: Car damage: front 0, rear 1, left 2, right 3, centre 4
*/

function gameHasProperty(propertyName) {
	var missing;
	switch ( $prop('DataCorePlugin.CurrentGame') ) {
		case 'AssettoCorsaCompetizione' : missing = [ '', // 0 doesnt exist
				'DataCorePlugin.GameData.NewData.TyreTemperatureFrontLeftInner',
				'DataCorePlugin.GameData.NewData.TyreTemperatureFrontLeftMiddle',
				'DataCorePlugin.GameData.NewData.TyreTemperatureFrontLeftOuter',
				'DataCorePlugin.GameData.NewData.TyreTemperatureFrontRightInner',
				'DataCorePlugin.GameData.NewData.TyreTemperatureFrontRightMiddle',
				'DataCorePlugin.GameData.NewData.TyreTemperatureFrontRightOuter',
				'DataCorePlugin.GameData.NewData.TyreTemperatureRearLeftInner',
				'DataCorePlugin.GameData.NewData.TyreTemperatureRearLeftMiddle',
				'DataCorePlugin.GameData.NewData.TyreTemperatureRearLeftOuter',
				'DataCorePlugin.GameData.NewData.TyreTemperatureRearRightInner',
				'DataCorePlugin.GameData.NewData.TyreTemperatureRearRightMiddle',
				'DataCorePlugin.GameData.NewData.TyreTemperatureRearRightOuter',
				'DataCorePlugin.GameData.NewData.TyreDirtFrontLeft',
				'DataCorePlugin.GameData.NewData.TyreDirtFrontRight',
				'DataCorePlugin.GameData.NewData.TyreDirtRearLeft',
				'DataCorePlugin.GameData.NewData.TyreDirtRearRight',
				'DataCorePlugin.GameData.NewData.TyreWearFrontLeft',
				'DataCorePlugin.GameData.NewData.TyreWearFrontRight',
				'DataCorePlugin.GameData.NewData.TyreWearRearLeft',
				'DataCorePlugin.GameData.NewData.TyreWearRearRight',
				'TyreTemperatureFrontLeftInner',
				'TyreTemperatureFrontLeftMiddle',
				'TyreTemperatureFrontLeftOuter',
				'TyreTemperatureFrontRightInner',
				'TyreTemperatureFrontRightMiddle',
				'TyreTemperatureFrontRightOuter',
				'TyreTemperatureRearLeftInner',
				'TyreTemperatureRearLeftMiddle',
				'TyreTemperatureRearLeftOuter',
				'TyreTemperatureRearRightInner',
				'TyreTemperatureRearRightMiddle',
				'TyreTemperatureRearRightOuter',
				'TyreDirtFrontLeft',
				'TyreDirtFrontRight',
				'TyreDirtRearLeft',
				'TyreDirtRearRight',
				'TyreWearFrontLeft',
				'TyreWearFrontRight',
				'TyreWearRearLeft',
				'TyreWearRearRight',
			];
			break;
	}
	if (missing.indexOf(propertyName) > 0) { return 0; }
	return 1;
}
