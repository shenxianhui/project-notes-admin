import * as THREE from 'three'
export default {
	//同一个工艺流程图中处理多个相同模型的数据
	handSameModalData({ type, name, arr, arrOrigin }) {
		arr.map((val, index) => {
			let obj = {
				type,
				name: name + index,
			}
			const { position, rotation, difname } = val
			if (position) obj.position = position
			obj.hasGlbRotateSet = true
			if (rotation) {
				obj.rotation = new THREE.Vector3(...rotation)
			}
			if (difname) obj.name = difname
			arrOrigin.push(obj)
		})
		console.log(arrOrigin)
	},
	//设置一个工艺流程图中所有模型数据公共的配置（只限glb）
	dealPositionData({ allArr }) {
		return allArr.map(val => {
			const { position, type, name } = val
			let pointString = []
			let positionNumber = []
			pointString = position.split(' ')
			positionNumber = [Number(pointString[2]), Number(pointString[0]), Number(pointString[1])]
			// positionNumber = [
			//     Number(pointString[0]),
			//     -Number(pointString[2]),
			//     Number(pointString[1])
			// ];
			if (!val.rotation) {
				val.rotation = new THREE.Vector3(Math.PI / 2, Math.PI / 2, 0)
				// 调整页面的特殊模型的旋转角度
				if (type === 'liuliangji' && name === '进水') {
					val.rotation = new THREE.Vector3(Math.PI / 2, 0, 0)
				}
				if (type === 'liuliangji' || type === 'yaliji') {
					val.scale = new THREE.Vector3(2, 2, 2)
				}
				val.hasGlbRotateSet = true
			}
			val.position = new THREE.Vector3(...positionNumber)
			val.modelType = 'glb'
			return val
		})
	},
	//老合台三维场景（模型数据）
	getObjDataZLYSC() {
		//树
		let treeArr = [
			{ position: '-3717.25 241.619 -3708.28' },
			{ position: '-4239.05 241.619 -3708.28' },
			{ position: '-4708.22 241.619 -4369.34' },
			{ position: '-4708.22 241.619 -4037.41' },
			{ position: '-4708.22 241.619 -3708.28' },
			{ position: '-3273.36 241.619 -3708.28' },
			{ position: '-3273.36 241.619 -4037.41' },
			{ position: '-3273.36 241.619 -4369.34' },
			{ position: '-2576.7 241.619 -4369.34' },
			{ position: '-2576.7 241.619 -4088.32' },
			{ position: '-2576.7 241.619 -3782.01' },
			{ position: '-2222.06 241.619 -3782.01' },
			{ position: '-1853.8 241.619 -3782.01' },
			{ position: '-1514.16 241.619 -3782.01' },
			{ position: '-1514.16 241.619 -4086.97' },
			{ position: '-1514.16 241.619 -4355.92' },
			{ position: '-639.06 248.884 -3086.89' },
			{ position: '-639.06 248.884 -3388.69' },
			{ position: '-639.06 248.884 -2807.65' },
			{ position: '-639.06 248.884 -2500.47' },
			{ position: '-639.06 248.884 -2198.67' },
			{ position: '-639.06 248.884 -1254.2' },
			{ position: '-639.06 248.884 -1556' },
			{ position: '-639.06 248.884 -1863.17' },
			{ position: '-639.06 248.884 -966.512' },
			{ position: '-639.06 248.884 -659.333' },
			{ position: '-639.06 248.884 -357.533' },
			{ position: '-1702.99 256.719 -1424.22' },
			{ position: '-1702.99 256.719 -1721.06' },
			{ position: '-1702.99 256.719 -2021.59' },
			{ position: '-1702.99 256.719 -2331.9' },
			{ position: '-1702.99 256.719 -2624.29' },
			{ position: '-1702.99 256.719 -2924.95' },
			{ position: '-1499.13 255.012 -824.398' },
			{ position: '-1722.4 255.012 -824.398' },
			{ position: '-1966.43 255.012 -824.398' },
			{ position: '-3966.69 255.012 -756.943' },
			{ position: '-3514.27 250.114 1008.32' },
			{ position: '-557.081 250.114 1008.32' },
			{ position: '-557.081 250.114 1244.36' },
			{ position: '-557.081 250.114 1503.24' },
			{ position: '-557.081 250.114 1751.61' },
			{ position: '-3581.59 255.012 -716.518' },
			{ position: '-2932.01 255.012 -756.943' },
			{ position: '-2546.91 255.012 -716.518' },
			{ position: '-270.38 250.114 1759.08' },
			{ position: '-270.38 250.114 1498.08' },
			{ position: '-270.38 250.114 1222.8' },
			{ position: '-270.38 250.114 1004.23' },
			{ position: '-270.38 250.114 673.659' },
			{ position: '-270.38 250.114 60.2463' },
		]
		//太阳能
		let solarArr = [
			{ position: '-2475.56 198.323 -1589.72' },
			{ position: '-2302.78 198.323 -1792.34' },
			{ position: '-2128.21 198.323 -1996.76' },
			{ position: '-2141.72 198.323 -1544.5' },
			{ position: '-1976.11 198.323 -1742.61' },
			{ position: '-2839.52 198.323 -1588.91' },
			{ position: '-2666.74 198.323 -1791.53' },
			{ position: '-2492.17 198.323 -1995.95' },
			{ position: '-2313.96 198.323 -2205.52' },
			{ position: '-2134.86 198.323 -2415.83' },
			{ position: '-3244.37 198.323 -1587.37' },
			{ position: '-3071.59 198.323 -1789.99' },
			{ position: '-2897.02 198.323 -1994.41' },
			{ position: '-2718.81 198.323 -2203.98' },
			{ position: '-2539.71 198.323 -2414.29' },
			{ position: '-2355.03 198.323 -2640.74' },
			{ position: '-2161.08 198.323 -2861.26' },
			{ position: '-3731.31 198.323 -1562.4' },
			{ position: '-3556.74 198.323 -1766.82' },
			{ position: '-3378.53 198.323 -1976.39' },
			{ position: '-3199.43 198.323 -2186.7' },
			{ position: '-3014.74 198.323 -2413.15' },
			{ position: '-2820.79 198.323 -2633.67' },
			{ position: '-2631.18 198.323 -2861.57' },
			{ position: '-3827.96 198.323 -1964.51' },
			{ position: '-3648.86 198.323 -2174.82' },
			{ position: '-3464.17 198.323 -2401.27' },
			{ position: '-3270.22 198.323 -2621.79' },
			{ position: '-3080.61 198.323 -2849.69' },
			{ position: '-4019.54 198.323 -1733.35' },
			{ position: '-4203.39 198.323 -1508.14' },
			{ position: '-4196.37 198.323 -2055.85' },
			{ position: '-4011.69 198.323 -2282.3' },
			{ position: '-3817.74 198.323 -2502.82' },
			{ position: '-3628.13 198.323 -2730.72' },
			{ position: '-4295.35 198.323 -2406.94' },
			{ position: '-4101.39 198.323 -2627.47' },
			{ position: '-3911.79 198.323 -2855.36' },
		]
		//栅栏
		let lanArr = [
			{
				position: '-797.931 117.776 1866.05',
				rotation: [Math.PI / 2, 0, 0],
			},
			{
				position: '-621.466 117.776 1866.05',
				rotation: [Math.PI / 2, 0, 0],
			},
			{
				position: '-444.844 117.776 1866.05',
				rotation: [Math.PI / 2, 0, 0],
			},
			{ position: '-345.439 117.776 1788.79' },
			{ position: '-345.439 117.776 1612.14' },
			{ position: '-345.439 117.776 1258.93' },
			{ position: '-345.439 117.776 1435.58' },
			{ position: '-345.439 117.776 1082.44' },
			{ position: '-345.439 117.776 905.786' },
			{ position: '519.315 209.102 3818.15' },
			{ position: '519.315 209.102 3994.33' },
			{ position: '519.315 209.102 3641.93' },
			{ position: '519.315 209.102 3465.75' },
			{ position: '519.315 209.102 3289.13' },
			{ position: '519.315 209.102 2759.75' },
			{ position: '519.315 209.102 2936.37' },
			{ position: '519.315 209.102 3112.55' },
			{ position: '519.315 209.102 2583.31' },
			{ position: '519.315 209.102 2407.12' },
			{ position: '519.315 209.102 2230.5' },
			{ position: '519.315 209.102 1701.33' },
			{ position: '519.315 209.102 1877.94' },
			{ position: '519.315 209.102 2054.13' },
			{ position: '519.315 209.102 1524.91' },
			{ position: '519.315 209.102 1348.72' },
			{ position: '519.315 209.102 1172.11' },
			{
				position: '319.555 155.227 125.381',
				rotation: [Math.PI / 2, 0, 0],
			},
			{ position: '418.619 155.227 47.7441' },
			{ position: '-270.38 250.114 60.2463' },
			{ position: '-270.38 250.114 60.2463' },
			{ position: '-270.38 250.114 60.2463' },
			{ position: '-270.38 250.114 60.2463' },
		]
		let arr = [
			{
				type: 'lawnLHTGTLF',
				name: '地盘',
				position: '-1757.563 84.627 -121.058',
			},
			{
				type: 'lawn1LHTGTLF',
				name: '地盘1',
				position: '-647.201 85.4424 -1850.31',
			},
			{
				type: 'lawn2LHTGTLF',
				name: '地盘2',
				position: '-619.873 81.1307 1337',
			},
			{
				type: 'lawn3LHTGTLF',
				name: '地盘3',
				position: '-3139.35 81.8986 -4205.93',
			},
			{
				type: 'lawn4LHTGTLF',
				name: '地盘4',
				position: '-3113.49 84.6273 2057.58',
			},
			{
				type: 'lawn5LHTGTLF',
				name: '地盘5',
				position: '-1640.41 84.6273 2140.54',
			},
			{
				type: 'lawn6LHTGTLF',
				name: '地盘6',
				position: '-291.229 118.154 1197.38',
			},
			{
				type: 'lawn7LHTGTLF',
				name: '地盘7',
				position: '-236.426 115.364 38.5939',
			},
			{
				type: 'lawn8LHTGTLF',
				name: '地盘8',
				position: '-2756.36 84.6273 -145.379',
			},
			{
				type: 'lawn9LHTGTLF',
				name: '地盘9',
				position: '-1719.94 84.6273 -2185.47',
			},
			{
				type: 'lawn10LHTGTLF',
				name: '地盘10',
				position: '-3791.03 84.6273 -145.379',
			},
			{
				type: 'lawn11LHTGTLF',
				name: '地盘11',
				position: '-2070.28 104.04 -4124.73',
			},
			{
				type: 'lawn12LHTGTLF',
				name: '地盘12',
				position: '-3151.8 97.9901 -2185.56',
			},
			{
				type: 'lawn13LHTGTLF',
				name: '地盘13',
				position: '-4038.79 104.04 -4124.73',
			},
			{
				type: 'roadLHTGTLF',
				name: '道路',
				needLabel: true,
				position: '-2212.188 69.976 -607.855',
			},
			{
				type: 'wallLHTGTLF',
				name: '墙',
				position: '-2258.482 115.364 -619.957',
			},
			{
				type: 'wastewaterreclamationLHTGTLF',
				name: '房子1',
				position: '-1760.556 317.838 -78.021',
			},
			{
				type: 'distributionroom1LHTGTLF',
				name: '屋顶装饰1',
				position: '-4781.12 264.182 -22.2873',
			},
			{
				type: 'distributionroom2LHTGTLF',
				name: '屋顶装饰2',
				position: '-4799.37 264.182 1418.54',
			},
			{
				type: 'distributionroom3LHTGTLF',
				name: '屋顶装饰3',
				position: '-4799.37 264.182 2736.29',
			},
			{
				type: 'distributionroom4LHTGTLF',
				name: '屋顶装饰4',
				position: '-756.276 264.182 -4110.29',
			},
			{
				type: 'officebuildingLHTGTLF',
				name: '房子1',
				position: '-446.881 310.149 2761.43',
			},
			{
				type: 'pumphouseLHTGTLF',
				name: '房子2',
				position: '-3130.59 290.085 -4842.14',
			},
			{
				type: 'reactiontankLHTGTLF',
				name: '房子3',
				position: '-3137.18 448.476 2028.95',
			},
			{
				type: 'recoveryworkshop2LHTGTLF',
				name: '房子4',
				position: '-1659.02 269.667 2507.12',
			},
			{
				type: 'recoveryworkshop1LHTGTLF',
				name: '房子5',
				position: '-1624.37 308.612 1549.82',
			},
			{
				type: 'securityroomLHTGTLF',
				name: '房子6',
				position: '144.744 189.938 -35.4994',
			},
			{
				type: 'sedimentLHTGTLF',
				name: '房子7',
				position: '-2751.19 443.625 -157.803',
			},
			{
				type: 'sedimentLHTGTLF',
				name: '房子8',
				position: '-3806.2 443.625 -157.803',
			},
			{
				type: 'handrail1LHTGTLF',
				name: '围栏1',
				position: '418.073 154.808 -139.776',
			},
			{
				type: 'handrail1LHTGTLF',
				name: '围栏2',
				position: '520.151 209.735 984.874',
			},
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯1',
			//     position: new THREE.Vector3(-4086.95,220.847,-894.685),
			//     rotation:new THREE.Vector3(0, Math.PI/4, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯2',
			//     position: new THREE.Vector3(-2059.86,220.847,-956.159)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯3',
			//     position: new THREE.Vector3(-3055.43,220.847,-908.799)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯4',
			//     position: new THREE.Vector3(352.374,220.847,3788.84),
			//     rotation:new THREE.Vector3(0, Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯5',
			//     position: new THREE.Vector3(352.374,220.847,2894.98),
			//     rotation:new THREE.Vector3(0, Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯6',
			//     position: new THREE.Vector3(352.374,220.847,1875.9),
			//     rotation:new THREE.Vector3(0, Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯7',
			//     position: new THREE.Vector3(352.374,220.847,1068.5),
			//     rotation:new THREE.Vector3(0, Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯8',
			//     position: new THREE.Vector3(-1435.26,220.847,3529.44)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯9',
			//     position: new THREE.Vector3(-2971.98,220.847,3529.44)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯10',
			//     position: new THREE.Vector3(-1317.24,220.847,-679.775),
			//     rotation:new THREE.Vector3(0, -Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯11',
			//     position: new THREE.Vector3(-1261.94,220.847,2059.76),
			//     rotation:new THREE.Vector3(0, -Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯12',
			//     position: new THREE.Vector3(-1261.94,220.847,3020.21),
			//     rotation:new THREE.Vector3(0, -Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯13',
			//     position: new THREE.Vector3(-1261.94,220.847,1141.51),
			//     rotation:new THREE.Vector3(0, -Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯14',
			//     position: new THREE.Vector3(-2044.01,220.847,1187.49),
			//     rotation:new THREE.Vector3(0, Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯15',
			//     position: new THREE.Vector3(-2044.01,220.847,2110.21),
			//     rotation:new THREE.Vector3(0, Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯16',
			//     position: new THREE.Vector3(-2044.01,220.847,2995.62),
			//     rotation:new THREE.Vector3(0, Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯17',
			//     position: new THREE.Vector3(-2479.32,220.847,1141.51),
			//     rotation:new THREE.Vector3(0, -Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯18',
			//     position: new THREE.Vector3(-2479.32,220.847,3020.21),
			//     rotation:new THREE.Vector3(0, -Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯19',
			//     position: new THREE.Vector3(-2479.32,220.847,2059.76),
			//     rotation:new THREE.Vector3(0, -Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯20',
			//     position: new THREE.Vector3(-1752.33,220.847,736.684),
			//     rotation:new THREE.Vector3(0, Math.PI, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯21',
			//     position: new THREE.Vector3(-2804.6,220.847,632.837),
			//     rotation:new THREE.Vector3(0,Math.PI, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯22',
			//     position: new THREE.Vector3(-3780.75,220.847,632.837),
			//     rotation:new THREE.Vector3(0,Math.PI, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯23',
			//     position: new THREE.Vector3(-3780.75,220.847,2107.81),
			//     rotation:new THREE.Vector3(0,Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯24',
			//     position: new THREE.Vector3(-3780.75,220.847,2995.62),
			//      rotation:new THREE.Vector3(0,Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯25',
			//     position: new THREE.Vector3(-4493.85,220.847,3410.14),
			//      rotation:new THREE.Vector3(0,-Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯26',
			//     position: new THREE.Vector3(-4493.85,220.847,2059.76),
			//     rotation:new THREE.Vector3(0,-Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯27',
			//     position: new THREE.Vector3(-4493.85,220.847,644.605),
			//      rotation:new THREE.Vector3(0,-Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯28',
			//     position: new THREE.Vector3(-4947.2,220.847,-1156.09),
			//     rotation:new THREE.Vector3(0,-Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯29',
			//     position: new THREE.Vector3(-4947.2,220.847,-2101.63),
			//     rotation:new THREE.Vector3(0,-Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯30',
			//     position: new THREE.Vector3(-4947.2,220.847,-3074.39),
			//     rotation:new THREE.Vector3(0,-Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯31',
			//     position: new THREE.Vector3(-3893.74,220.847,-3530.9),
			//     rotation:new THREE.Vector3(0,Math.PI, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯32',
			//     position: new THREE.Vector3(-2064.44,220.847,-3530.9),
			//     rotation:new THREE.Vector3(0,Math.PI, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯33',
			//     position: new THREE.Vector3(-967.98,220.847,3012.47),
			//     rotation:new THREE.Vector3(0,Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯34',
			//     position: new THREE.Vector3(-967.98,220.847,2061.03),
			//     rotation:new THREE.Vector3(0,Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯35',
			//     position: new THREE.Vector3(-967.98,220.847,1068.5),
			//     rotation:new THREE.Vector3(0,Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯36',
			//     position: new THREE.Vector3(-967.98,220.847,-1029.28),
			//     rotation:new THREE.Vector3(0,Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯37',
			//     position: new THREE.Vector3(-967.98,220.847,-2176.66),
			//     rotation:new THREE.Vector3(0,Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯38',
			//     position: new THREE.Vector3(-967.98,220.847,-3041.69),
			//     rotation:new THREE.Vector3(0,Math.PI/2, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯39',
			//     position: new THREE.Vector3(-4086.95,220.847,-1234.55),
			//     rotation:new THREE.Vector3(0,Math.PI, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯40',
			//     position: new THREE.Vector3(-3076.94,220.847,-1234.55),
			//     rotation:new THREE.Vector3(0,Math.PI, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯41',
			//     position: new THREE.Vector3(-2038.87,220.847,-1234.55),
			//     rotation:new THREE.Vector3(0,Math.PI, 0)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯42',
			//     position: new THREE.Vector3(-4086.95,220.847,-3125.01)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯43',
			//     position: new THREE.Vector3(-2059.86,220.847,-3131.73)
			// },
			// {
			//     type: 'lightLHTGTLF',
			//     name: '路灯43',
			//     position: new THREE.Vector3(-3055.43,220.847,-3139.12)
			// }
		]
		this.handSameModalData({
			type: 'Tree1LHTGTLF',
			name: '树',
			arr: treeArr,
			arrOrigin: arr,
		})
		this.handSameModalData({
			type: 'solarpanelLHTGTLF',
			name: '太阳能',
			arr: solarArr,
			arrOrigin: arr,
		})
		this.handSameModalData({
			type: 'handrailLHTGTLF',
			name: '栅栏',
			arr: lanArr,
			arrOrigin: arr,
		})
		const changArr = this.dealPositionData({ allArr: arr })
		return changArr
	},
	//CBD泵站工艺（模型数据）
	getObjDataCBDBZglb() {
		const objData1 = [
			{
				name: 'room',
				type: 'roomCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(14.9744, -88.5159, 130.045),
			},
			{
				name: '泵1',
				type: 'bengCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-37.725, -127.642, 82.1356),
			},
			{
				name: '泵2',
				type: 'bengCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-37.725, -37.9359, 82.1356),
				rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
			},
			{
				name: '泵3',
				type: 'bengCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-37.725, 54.0988, 82.1356),
				rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
			},
			{
				name: '泵4',
				type: 'bengCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-37.725, 142.438, 82.1356),
				rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
			},
			{
				name: '阀门1',
				type: 'famenCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-209.337, -229.965, 98.293),
			},
			{
				name: '阀门2',
				type: 'famenCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-200.552, 4.49208, 98.293),
				rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
			},
			{
				name: '楼梯',
				type: 'loutiCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(68.2753, -49.9517, 163.356),
			},
			{
				name: '流量计',
				type: 'liuliangjiCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-233.517, 9.13081, 79.1561),
			},
			{
				name: '管道',
				type: 'guandaoCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-63.6351, -84.2187, 111.654),
			},
			{
				name: '水桶',
				type: 'shuitongCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(104.302, -35.9431, 131.744),
			},
			{
				name: 'qiguan',
				type: 'qiguanCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-88.3095, 204.361, 85.6278),
			},
			{
				name: '水表1',
				type: 'shuibiaoCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-92.891, 111.12, 147.971),
			},
			{
				name: '水表2',
				type: 'shuibiaoCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(-101.906, -231.092, 80.1231),
				rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
			},
			{
				name: '水表3',
				type: 'shuibiaoCBDBZ',
				modelType: 'glb',
				position: new THREE.Vector3(93.0442, -18.095, 168.378),
				rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
			},
		]
		return objData1
	},
	//汝城加药间（模型数据）
	getObjDataJYJglb() {
		const objData1 = [
			{
				name: '表具1',
				type: 'biaojuJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-24.8769, -26.5436, 106.338),
			},
			{
				name: '表具2',
				type: 'biaojuJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(21.6865, -26.5436, 106.338),
			},
			{
				name: '泵1',
				type: 'bengJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(21.979, -50.3241, 51.0057),
			},
			{
				name: '泵2',
				type: 'bengJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-24.2448, -50.3241, 51.0057),
			},
			{
				name: '小表具1',
				type: 'xiaobiaojuJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(34.2108, -26.535, 103.366),
			},
			{
				name: '小表具2',
				type: 'xiaobiaojuJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-38.2726, -26.535, 103.366),
			},
			{
				name: 'yiqi1',
				type: 'yiqi1JYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-81.3366, -64.3072, 87.4112),
			},
			{
				name: 'yiqi',
				type: 'yiqiJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-80.3604, -70.1764, 55.4851),
			},
			{
				name: '管道',
				type: 'guandaoJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-20.9372, -42.2116, 47.7669),
			},
			{
				name: '架子',
				type: 'jiaziJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-0.927693, -32.6105, 59.3705),
			},
			{
				name: '水桶1',
				type: 'shuitongJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-31.0179, 37.7442, 58.5502),
			},
			{
				name: '水桶2',
				type: 'shuitongJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(31.9075, 37.7442, 58.5502),
			},
			{
				name: 'room',
				type: 'roomJYJ',
				modelType: 'glb',
				position: new THREE.Vector3(-1.9996, -10.4642, 57.4751),
			},
		]
		return objData1
	},
	//汝城泵房（模型数据）
	getObjDataRCBFglb() {
		const objData1 = [
			{
				name: '水箱',
				type: 'shuixaingBF',
				modelType: 'glb',
				position: new THREE.Vector3(-21.2044, 225.936, 158.522),
			},
			{
				name: '储水器',
				type: 'chushuiqiBF',
				modelType: 'glb',
				position: new THREE.Vector3(-92.9022, -54.5854, 89.2496),
			},
			{
				name: '管道',
				type: 'guandaoBF',
				modelType: 'glb',
				position: new THREE.Vector3(-27.6607, -59.3775, 84.9534),
			},
			{
				name: '泵1',
				type: 'bengBF',
				modelType: 'glb',
				position: new THREE.Vector3(-38.659, -122.351, 83.5805),
			},
			{
				name: '泵2',
				type: 'bengBF',
				modelType: 'glb',
				position: new THREE.Vector3(-146.336, -122.351, 83.5805),
			},
			{
				name: '泵3',
				type: 'bengBF',
				modelType: 'glb',
				position: new THREE.Vector3(-91.7117, -122.351, 83.5805),
			},
			{
				name: '泵4',
				type: 'beng1BF',
				modelType: 'glb',
				position: new THREE.Vector3(84.2153, -54.8372, 101.504),
			},
			{
				name: 'room',
				type: 'roomBF',
				modelType: 'glb',
				position: new THREE.Vector3(-28.295, 2.83696, 165.245),
			},
		]
		return objData1
	},
	getObjDataEHZGLBArray(configType) {
		return [
			{
				name: '建筑',
				type: '20210720194454082_build',
				position: '-11752.8 2264.73 -17323.6',
				needTransparent: true,
			},
			{
				name: '地块',
				type: '20210720194454082_dikuai',
				position: '-19502.1 30 -16311.4',
				needTransparent: true,
			},
			{
				name: '地面',
				type: '20210720194454082_dimian',
				position: '-12514.3 0 -14235',
				needTransparent: true,
			},
			{
				name: '草',
				type: '20210720194454082_grass',
				position: '-13726.7 111.839 -26016.2',
				needTransparent: true,
			},
			{
				name: '墙',
				type: 'guangqiang',
				position: '-3181.959 4000 -12524.203',
				needTransparent: true,
				extraAttribute: '{"needBeam":true}',
				needBeam: true,
			},
			{
				name: '地面',
				type: 'roadETZGLB',
				position: '-3140.01 42.4804 -12084.2',
			},
			{
				name: '电箱',
				type: 'distribution_boxETZGLB',
				position: '2278.31 372.561 -18322.9',
				// showLabelType: 1,
			},

			{
				name: '元素1',
				type: 'element1ETZGLB',
				position: '2893.1 458.151 -15382.1',
				// showLabelType: 1,
			},
			{
				name: '元素2',
				type: 'element2ETZGLB-processed',
				position: '-4927.05 524.193 -2982.19',
				// showLabelType: 1,
			},
			{
				name: '玻璃',
				type: 'glassETZGLB',
				position: '2568.99 603.263 -11807.2',
				// showLabelType: 1,
			},
			{
				name: '草1',
				type: 'grassland1ETZGLB',
				position: '-11493 86.5049 -12239.3',
				// showLabelType: 1,
			},
			{
				name: '草2',
				type: 'grassland2ETZGLB',
				position: '3767.61 129 -17099.1',
				// showLabelType: 1,
			},
			{
				name: '草3',
				type: 'grassland3ETZGLB',
				position: '3170.44 69.3754 -8480.35',
			},
			{
				name: '草4',
				type: 'grassland4ETZGLB',
				position: '-10338.8 63.9065 -23801.1',
			},
			{
				name: '草5',
				type: 'grassland5ETZGLB',
				position: '-4275.14 135.487 -23815.1',
			},
			{
				name: '草6',
				type: 'grassland6ETZGLB',
				position: '3671.91 57.0135 -23894.1',
			},
			{
				name: '草7',
				type: 'glassland7ETZGLB',
				position: '-4968.58 179.367 -7778.8',
			},
			{
				name: '草8',
				type: 'glassland8ETZGLB',
				position: '-4910.54 166.295 -2972.18',
			},
			{
				name: '草9',
				type: 'glassland9ETZGLB',
				position: '-4378.04 169.661 -15940.5',
			},
			{
				name: 'ground',
				type: 'groundETZGLB',
				position: '3199.66 77.7136 -1946.27',
			},
			{
				name: '灯光',
				type: 'lightETZGLB-processed',
				position: '-397.269 579.935 -10671.6',
			},
			{
				name: '办公室',
				type: 'officebuilding1ETZGLB-processed',
				position: '3274.31 832.031 -3187.3',
			},
			{
				name: '安全房',
				type: 'securityroom1ETZGLB-processed',
				position: '-244.446 348.735 156.062',
			},
			{
				name: '太阳能',
				type: 'solarpanelETZGLB-processed',
				position: '4898.42 502.125 -14927.6',
			},
			{
				name: '太阳能1',
				type: 'solarpanelETZGLB-processed',
				position: '4898.42 502.125 -18340.2',
			},
			{
				name: '太阳能2',
				type: 'solarpanelETZGLB-processed',
				position: '4898.42 502.125 -17195.2',
			},
			{
				name: '清水池',
				nextDiagramId: '111',
				type: 'solarpanelETZGLB-processed',
				position: '4898.42 502.125 -16048.6',
				showLabelType: 1,
				labelContent: [
					{
						monitorData: '0.71',
						monitorTypeName: '余氯：',
						monitorTypeUnit: 'mg/L',
					},
					{
						monitorData: '2.2',
						monitorTypeName: '液位：',
						monitorTypeUnit: 'm',
					},
				],
				labelScale: 30,
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '6443.32 687.362 -13539.6',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '3978.85 687.362 -13539.6',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '1913.21 687.362 -13539.6',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '274.886 687.362 -16376.4',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '274.886 687.362 -15041.5',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '274.886 687.362 -13539.6',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '4617.65 539.217 -5746.83',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '2772.56 539.217 -5746.83',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '1026.58 539.217 -5746.83',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '1026.58 539.217 -11196.1',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '2772.56 539.217 -11196.1',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '4617.65 539.217 -11196.1',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '6311.78 539.217 -11196.1',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '6311.78 539.217 -9841.42',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '6311.78 539.217 -8652.16',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',

				position: '6311.78 539.217 -7282.7',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				// showLabelType: 1,
				position: '6311.78 539.217 -6183.78',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				// showLabelType: 1,
				position: '-213.206 539.217 -6183.78',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '-213.206 539.217 -7282.7',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '-213.206 539.217 -8652.16',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '-213.206 539.217 -9841.42',
			},
			{
				name: '树木',
				type: 'treeETZGLB-processed',
				position: '-213.206 539.217 -11196.1',
			},
			{
				name: '墙1',
				type: 'wall1ETZGLB-processed',
				position: '-6082.77 192.91 -0.831147',
			},
			{
				name: '墙2',
				type: 'wall2ETZGLB-processed',
				position: '7996.06 306.246 -12327.9',
			},
			{
				name: '墙3',
				type: 'wall3ETZGLB-processed',
				position: '-12155.7 306.246 -12268.2',
			},
			{
				name: '墙4',
				type: 'wall4ETZGLB-processed',
				position: '-3228.4 273.185 -25297.7',
			},
			{
				name: '栅栏1',
				type: 'zhalan1ETZGLB-processed',
				position: '4159.23 252.746 126.891',
			},
			{
				name: '污水排放',
				type: 'liuliangji',
				position: '-6928.809 271.183 -670.031',
				// showLabelType: 1,
				nextDiagramId: '111',
				scaleDefault: 2,
				labelContent: [
					{
						monitorTypeName: '污水浊度：',
						monitorData: '3.254',
						monitorTypeUnit: 'NTU',
						showDataType: 0,
					},
					{
						monitorTypeName: '瞬时流量：',
						monitorData: '560',
						monitorTypeUnit: 'm³/h',
						showDataType: 0,
					},
					{
						monitorTypeName: '今日累计：',
						monitorData: '1457',
						monitorTypeUnit: 'm³',
						showDataType: 0,
					},
				],
				labelScale: 30,
			},
			{
				name: '进水',
				type: 'liuliangji',
				position: '-3879.835 1019.173 -26048.566',
				showLabelType: 1,
				nextDiagramId: '111',
				scaleDefault: 2,
				labelContent: [
					{
						monitorTypeName: '浊度：',
						monitorData: '5.24',
						monitorTypeUnit: 'NTU',
						showDataType: 0,
					},
					{
						monitorTypeName: '瞬时流量：',
						monitorData: '1763',
						monitorTypeUnit: 'm³/h',
						showDataType: 0,
					},
					{
						monitorTypeName: '今日累计：',
						monitorData: '3.43',
						monitorTypeUnit: '万m³',
						showDataType: 0,
					},
				],
				labelScale: 30,
			},
			{
				name: '出水',
				type: 'liuliangji',
				position: '7946.816 798.827 -20868.016',
				showLabelType: 1,
				nextDiagramId: '111',
				scaleDefault: 2,
				labelContent: [
					{
						monitorTypeName: '出水余氯：',
						monitorData: '0.71',
						monitorTypeUnit: 'mg/L',
						showDataType: 0,
					},
					{
						monitorTypeName: '出水浊度：',
						monitorData: '0.08',
						monitorTypeUnit: 'NTU',
						showDataType: 0,
					},
					{
						monitorTypeName: '出水PH值：',
						monitorData: '7.2',
						monitorTypeUnit: '',
						showDataType: 0,
					},
					{
						monitorTypeName: '瞬时流量：',
						monitorData: '883',
						monitorTypeUnit: 'm³/h',
						showDataType: 0,
					},
					{
						monitorTypeName: '出水压力：',
						monitorData: '0.42',
						monitorTypeUnit: 'Mpa',
						showDataType: 0,
						// alarm:true
					},
					{
						monitorTypeName: '今日累计：',
						monitorData: '3.36',
						monitorTypeUnit: '万m³',
						showDataType: 0,
					},
				],
				labelScale: 30,
			},
			{
				name: '压力计',
				type: 'yaliji',
				scaleDefault: 2,
				position: '8861.37 826.706 -20853.77',
			},

			{
				name: '栅栏2',
				type: 'zhalan2ETZGLB-processed',
				position: '3722.14 252.757 126.902',
			},
			{
				name: '斑马线',
				type: '20210720194454082_banmaxian',
				position: '-12839.8 5 -25994.8',
				needTransparent: true,
			},
			{
				name: '房子2',
				// type: 'architecture22ETZGLB-processed',
				type: 'architecture22ETZGLB',
				position: '-4129.23 919.783 -15956.6',
				// showMonitorType: configType ? 4 : null,
				// showLabelType: 1
			},
			{
				name: '房子3',
				type: 'architecture4ETZGLB-processed',
				position: '-4853.33 962.022 -7776.68',
				// showLabelType: 1,
				showMonitorType: configType ? 4 : null,
			},
			{
				name: '房子4',
				type: 'architecture5ETZGLB-processed',
				position: '4732.53 680.863 -20791.1',
				// showLabelType: 1,
				showMonitorType: configType ? 4 : null,
			},
			{
				name: '房子5',
				type: 'architecture6ETZGLB-processed',
				position: '848.001 670.788 -19605.1',
				// showLabelType: 1,
			},
			{
				name: '房子6',
				type: 'architecture7ETZGLB',
				position: '3665.96 601.443 -23844.1',
				// showLabelType: 1,
			},
			{
				name: '房子7',
				type: 'architecture8ETZGLB',
				position: '-3577.29 1048.55 -23739.8',
				// showLabelType: 1,
			},
			{
				name: '房子8',
				// type: 'architecture9ETZGLB-processed',
				type: 'architecture9ETZGLB',
				position: '-10622.2 600.526 -23862.2',
				// showLabelType: 1,
			},
			{
				name: '房子8',
				type: 'brandETZGLB',
				position: '-1884.98 153.417 2.33188',
				// showLabelType: 1,
			},
			{
				name: '房子8',
				type: 'dunETZGLB',
				position: '4134.55 95.2116 123.294',
				// showLabelType: 1,
			},
			{
				name: '房子1',
				// type: 'architecture13ETZGLB-processed',
				type: 'architecture13ETZGLB',
				position: '5414.03 1048.44 -611.238',
				showMonitorType: configType ? 4 : null,
				// showLabelType: 1
			},
		]
	},
	//二台子水厂沙盘
	getObjDataEHZGLB(configType) {
		const arr = this.getObjDataEHZGLBArray(configType)
		// debugger
		return this.dealPositionData({ allArr: arr })
	},
	//二台子水厂沙盘
	getObjDataEHZALARMGLB(configType) {
		let arr = this.getObjDataEHZGLBArray(configType)
		const newArr = arr.map(item => {
			if (item.type === 'guangqiang') {
				item.disappear = true
			}
			if (item.type === 'architecture5ETZGLB-processed') {
				item.alarmPrompt = true
			}
			if (item.type === 'liuliangji' && item.name === '出水') {
				// debugger;
				item.labelContent[4].alarm = true
			}
			return { ...item }
		})
		// debugger
		return this.dealPositionData({ allArr: newArr })
	},
	getObjDataZSGLBArray() {
		return [
			// {
			// 	name: '玻璃',
			// 	type: 'glass',
			// 	position: '2253.88 2024.51 -2453.88',
			// 	// showMonitorType: 4 ,
			// 	// showLabelType: 1
			// },
			{
				name: '地形',
				type: 'dixingZS-processed',
				position: '2155.64 1632.909 -2253.645',
				// showLabelType: 1,
			},
			{
				name: '水箱',
				type: 'shuixiang',
				position: '9085.35 2943.87 -4818.22',
				// showLabelType: 1
			},
			{
				name: '列',
				type: 'column',
				position: '2002.67 3579.05 -4991.65',
				// showLabelType: 1
			},
			{
				name: '消防',
				type: 'xiaofang',
				position: '1568.59 999.379 -1429.07',
			},
			{
				name: '垃圾桶',
				type: 'lajitong',
				position: '-1558.01 1011.69 -852.243',
				// showLabelType: 1
			},
			{
				name: '木',
				type: 'wood',
				position: '-111.557 1247.92 596.24',
				// showLabelType: 1,
				// labelContent:[{
				// 	monitorData: "-111.557 1247.92 596.24",
				// 	monitorTypeName: "浊度：",
				// 	monitorTypeUnit: "NTU",
				// }],
				// labelScale:20
			},
			{
				name: '基础',
				type: 'base',
				position: '580.356 940.556 -1113.52',
				// showLabelType: 1,
				// labelContent:[{
				// 	monitorData: "580.356 940.556 -1113.52",
				// 	monitorTypeName: "浊度：",
				// 	monitorTypeUnit: "NTU",
				// }],
				// labelScale:20
			},
			{
				name: '清水池液位',
				type: 'architecture3ZS',
				position: '-3655.59 1819.35 -1796.53',
				showLabelType: 1,
				showMonitorType: 4,
				labelScale: 0.5,
				// showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '液位：',
						monitorData: '2.83',
						monitorTypeUnit: 'm',
						showDataType: 0,
					},
				],
				// labelScale: 10,
			},
			{
				name: '瓦罐',
				type: 'waguan',
				position: '147.728 1040.75 464.748',
				// showLabelType: 1,
			},
			{
				name: '树',
				type: 'treeZS-processed',
				position: '39.796 2515.48 -5621.86',
				// showLabelType: 1,
			},

			{
				name: '树',
				type: 'treeZS-processed',
				position: '-2699.47 1835.74 -7916.43',
				// showLabelType: 1,
			},
			{
				name: '树',
				type: 'treeZS-processed',
				position: '-1757.29 1869.04 -5621.86',
				// showLabelType: 1,
			},
			{
				name: '树',
				type: 'treeZS-processed',
				position: '-5431.32 2178.48 -5123.5',
				// showLabelType: 1,
			},
			{
				name: '树',
				type: 'treeZS-processed',
				position: '-1864.18 1514.79 -1956.44',
				// showLabelType: 1,
			},
			{
				name: '树1',
				type: 'tree2ZS-processed',
				position: '-4652.97 1359.7 -653.834',
				// showLabelType: 1,
			},
			{
				name: '树2',
				type: 'tree2ZS-processed',
				position: '-4652.97 1389.94 469.709',
			},
			{
				name: '树3',
				type: 'tree2ZS-processed',
				position: '-4291.28 1405.96 1065.12',
				showMonitorType: 4,
				labelScale: 1.1,
			},
			{
				name: '树4',
				type: 'tree2ZS-processed',
				position: '-3170 1405.96 1065.12',
			},
			{
				name: '树5',
				type: 'tree2ZS-processed',
				position: '-2064.57 1405.96 1065.12',
			},
			{
				name: '树6',
				type: 'tree2ZS-processed',
				position: '-810.397 1405.96 1065.12',
				// showLabelType: 1,
			},
			{
				name: '树7',
				type: 'tree2ZS-processed',
				position: '159.111 1405.96 1065.12',
				// showLabelType: 1,
			},
			{
				name: '树8',
				type: 'tree2ZS-processed',
				position: '1152.72 1405.96 1065.12',
				// showLabelType: 1,
			},
			{
				name: '树9',
				type: 'tree1',
				position: '2213.22 2943.39 -5473.45',
				// showLabelType: 1,
			},

			{
				name: '房屋',
				type: 'architecture2ZS-processed',
				position: '-323.496 1856.81 -2092.25',
			},
			{
				name: '结构体系1',
				type: 'architecture1ZS-processed',
				position: '3497.67 1856.81 -1462.27',
				// showLabelType: 1,
				showMonitorType: 4,
				labelScale: 0.5,
			},

			// 工艺流程模型
			{
				name: '结构体系1',
				type: 'shebei4ZSGY',
				position: '4996.4 1405.12 -2250.98',
			},
			{
				name: '结构体系1',
				type: 'dizhuan1ZSGY',
				position: '4200.14 790.054 -1480.12',
			},
			{
				name: '结构体系1',
				type: 'dizhuan2ZSGY',
				position: '32.1993 788.715 -2099.54',
			},
			{
				name: '结构体系1',
				type: 'shuixiang3ZSGY',
				position: '4041.3 1451.88 -3620.08',
			},
			{
				name: '产水水质',
				type: 'shuixiang1ZSGY',
				position: '4040.91 1608.33 -3620.47',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '产水浊度：',
						monitorData: '0.11',
						monitorTypeUnit: 'NTU',
						showDataType: 0,
					},
					{
						monitorTypeName: '产水余氯：',
						monitorData: '0.23',
						monitorTypeUnit: 'mg/L',
						showDataType: 0,
					},
					{
						monitorTypeName: '产水ph值：',
						monitorData: '6.8',
						monitorTypeUnit: '',
						showDataType: 0,
					},
				],
				labelScale: 10,
			},
			{
				name: '结构体系1',
				type: 'guandao7ZSGY',
				position: '3717.8 1244.35 -3620.32',
			},
			{
				name: '膜组参数',
				type: 'guandao6ZSGY',
				position: '-105.031 1232.55 -2167.45',
			},
			{
				name: '膜组参数',
				type: 'guandao5ZSGY',
				position: '-142.908 1445.85 -2626.78',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '1#膜前液位：',
						monitorData: '1.8',
						monitorTypeUnit: 'm',
						showDataType: 0,
					},
					{
						monitorTypeName: '1#跨膜压差：',
						monitorData: '0.19',
						monitorTypeUnit: 'Mpa',
						showDataType: 0,
					},
				],
				labelScale: 10,
			},
			{
				name: '结构体系1',
				type: 'guandao3ZSGY',
				position: '-535.006 1081.65 -2152.63',
			},
			{
				name: '结构体系1',
				type: 'guandao2ZSGY',
				position: '4636.03 949.635 -20.6398',
			},
			{
				name: '结构体系1',
				type: 'guandao1ZSGY',
				position: '4961.87 1300.37 -1142.46',
			},
			{
				name: '结构体系1',
				type: 'shebei8ZSGY',
				position: '289.115 857.459 -2401.21',
			},
			{
				name: '结构体系1',
				type: 'shebei1ZSGY',
				position: '4830.54 1290.86 -1197.53',
			},
			{
				name: '结构体系1',
				type: 'shebei3ZSGY',
				position: '4733.58 1322.34 -1149.1',
			},
			{
				name: '结构体系1',
				type: 'shebei2ZSGY',
				position: '4866.67 1270.39 -1094.86',
			},
			// {
			//     name: '结构体系1',
			// 	type: "waterZSGY",
			//     position: '-3653.38 1803.16 -2249.84',
			// },
			{
				name: '结构体系1',
				type: 'xiashuidaoZSGY',
				position: '4201 806.427 -1475.62',
			},
			{
				name: '产水出口参数',
				type: 'shuixiang2ZSGY',
				position: '4413.92 972.898 417.224',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '产水压力：',
						monitorData: '0.36',
						monitorTypeUnit: 'Mpa',
						showDataType: 0,
					},
					{
						monitorTypeName: '产水瞬时流量：',
						monitorData: '389',
						monitorTypeUnit: 'm³/h',
						showDataType: 0,
					},
					{
						monitorTypeName: '累计流量：',
						monitorData: '28950',
						monitorTypeUnit: 'm³',
						showDataType: 0,
					},
				],
				labelScale: 10,
			},
			{
				name: '结构体系1',
				type: 'shuixiang2ZSGY',
				position: '4604.21 972.898 417.224',
			},

			{
				name: '结构体系1',
				type: 'shuixiang2ZSGY',
				position: '4229.6 972.898 417.224',
			},
			{
				name: '结构体系1',
				type: 'shuixiang2ZSGY',
				position: '4042.66 972.898 417.224',
			},
			{
				name: '结构体系1',
				type: 'shuixiangZSGY',
				position: '-1047.1 1008.78 -1325.3',
			},
			{
				name: '结构体系1',
				type: 'beng1ZSGY',
				position: '4962.32 880.505 206.386',
			},
			{
				name: '结构体系1',
				type: 'beng2ZSGY',
				position: '4962.32 865.277 -68.3952',
			},
			{
				name: '结构体系1',
				type: 'beng2ZSGY',
				position: '4962.32 865.277 332.915',
			},
			{
				name: '结构体系1',
				type: 'beng3ZSGY',
				position: '-1039.53 878.293 -1569.42',
			},
			{
				name: '结构体系1',
				type: 'shebei5ZSGY',
				position: '4883 969.556 -311.627',
			},
			{
				name: '结构体系1',
				type: 'shebei6ZSGY',
				position: '3768.96 1609.33 -3630.74',
			},
			{
				name: '结构体系1',
				type: 'shebei7ZSGY',
				position: '3783.18 1461.3 -3620.74',
			},
			{
				name: '结构体系1',
				type: 'shalvguan1ZSGY',
				position: '480.879 1393.96 -2622.77',
			},
			{
				name: '结构体系1',
				type: 'bengZSGY',
				position: '299.752 932.611 -2702.63',
			},
			{
				name: '结构体系1',
				type: 'yiqiZSGY',
				position: '-216.777 1508.96 -2115.33',
			},
			{
				name: '结构体系1',
				type: 'yiqiZSGY',
				position: '-12.9136 1515.77 -2115.33',
			},
			{
				name: '结构体系1',
				type: 'yiqiZSGY',
				position: '-216.777 1355.65 -2113.96',
			},
			{
				name: '结构体系1',
				type: 'yiqiZSGY',
				position: '12.9136 1351.03 -2113.96',
			},
			{
				name: '结构体系1',
				type: 'yiqiZSGY',
				position: '-216.777 1199.3 -2115.33',
			},
			{
				name: '结构体系1',
				type: 'dibanZSGY',
				position: '3916.52 1486.96 -3622.17',
			},
		]
	},

	//章山水厂沙盘
	getObjDataZSGLB() {
		let arr = this.getObjDataZSGLBArray()
		return this.dealPositionData({ allArr: arr })
	},
	//章山水厂沙盘
	getObjDataALARMZSGLB() {
		let arr = this.getObjDataZSGLBArray()
		const newArr = arr.map(item => {
			if (item.type === 'architecture1ZS-processed') {
				item.alarmPrompt = true
			}
			if (item.type === 'shuixiang2ZSGY' && item.name === '产水出口参数') {
				// debugger;
				item.labelContent[0].alarm = true
			}
			return { ...item }
		})
		return this.dealPositionData({ allArr: newArr })
	},

	// 苍南天信
	getObjectDataCNTX() {
		let arr = [
			{
				name: '2#泵',
				type: 'bengCNTXGLB',
				position: '117.688 87.9424 -14.4587',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '频率：',
						monitorData: '34',
						monitorTypeUnit: 'Hz',
						showDataType: 0,
					},
					{
						monitorTypeName: '电流：',
						monitorData: '80',
						monitorTypeUnit: 'A',
						showDataType: 0,
					},
					{
						monitorTypeName: '电压：',
						monitorData: '220',
						monitorTypeUnit: 'V',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
			{
				name: '1#泵',
				type: 'bengCNTXGLB',
				position: '34.225 87.9424 -14.4587',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '频率：',
						monitorData: '34',
						monitorTypeUnit: 'Hz',
						showDataType: 0,
					},
					{
						monitorTypeName: '电流：',
						monitorData: '80',
						monitorTypeUnit: 'A',
						showDataType: 0,
					},
					{
						monitorTypeName: '电压：',
						monitorData: '220',
						monitorTypeUnit: 'V',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
			{
				name: 'dimianCNTXGLB',
				type: 'dimianCNTXGLB',
				position: '29.441 17.513 -8.26894',
			},
			{
				name: '水质检测仪',
				type: 'jianceyiCNTXGLB',
				position: '-92.7656 66.4432 38.1336',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '浊度：',
						monitorData: '0.2',
						monitorTypeUnit: 'NTU',
						showDataType: 0,
					},
					{
						monitorTypeName: '余氯：',
						monitorData: '1.2',
						monitorTypeUnit: 'mg/L',
						showDataType: 0,
					},
					{
						monitorTypeName: 'PH：',
						monitorData: '7.2',
						monitorTypeUnit: '',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
			// {
			// 	"name": "jianceyiCNTXGLB",
			// 	"type": "jianceyiCNTXGLB",
			// 	"position": "-85.6884 -38.365 11.5732"
			// },
			{
				name: 'kongzhiguiCNTXGLB',
				type: 'kongzhiguiCNTXGLB',
				position: '-110.994 110.338 121.511',
			},
			// {
			// 	"name": "kongzhiguiCNTXGLB",
			// 	"type": "kongzhiguiCNTXGLB",
			// 	"position": "-103.917 5.52982 94.9511"
			// },
			{
				name: '出口流量',
				type: 'liuliangjiCNTXGLB',
				position: '97.4628 86.48 30.7138',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '累计流量：',
						monitorData: '869',
						monitorTypeUnit: 'm³',
						showDataType: 0,
					},
					{
						monitorTypeName: '瞬时流量：',
						monitorData: '32',
						monitorTypeUnit: 'm³/h',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
			// {
			// 	"name": "liuliangjiCNTXGLB",
			// 	"type": "liuliangjiCNTXGLB",
			// 	"position": "104.54 -18.3282 4.15344"
			// },
			{
				name: 'qiguanCNTXGYGLB',
				type: 'qiguanCNTXGYGLB',
				position: '73.0709 54.3502 -14.7564',
			},
			{
				name: 'shebeiCNTXGYGLB',
				type: 'shebeiCNTXGYGLB',
				position: '82.3136 110.611 -64.1837',
			},
			{
				name: 'wallCNTXGLB',
				type: 'wallCNTXGLB',
				position: '23.931 141.042 -12.587',
			},
			{
				name: 'yalijiCNTXGYGLB',
				type: 'yalijiCNTXGYGLB',
				position: '59.8275 131.444 -99.8863',
			},
			{
				name: '出口压力',
				type: 'yalijiCNTXGYGLB',
				position: '59.8275 87.6187 30.119',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '压力：',
						monitorData: '0.31',
						monitorTypeUnit: 'Mpa',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
			{
				name: '进口压力',
				type: 'yalijiCNTXGYGLB',
				position: '29.651 212.6 -136.758',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '压力：',
						monitorData: '0.31',
						monitorTypeUnit: 'Mpa',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
		]
		return this.dealPositionData({ allArr: arr })
	},
	getObjectDataSGWFYArray() {
		return [
			{
				name: 'wallCNTXGLB',
				type: 'wallCNTXGLB',
				position: '-61.8 61.552 38.053',
			},
			{
				name: 'bashouSGWFY',
				type: 'bashouSGWFY',
				position: '-11.1159 -11.5023 11.0205',
			},
			{
				name: '2#泵',
				type: 'beng1SGWFY',
				position: '5.60822 -15.7908 5.87472',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '频率：',
						monitorData: '34.8',
						monitorTypeUnit: 'Hz',
						showDataType: 0,
					},
					{
						monitorTypeName: '电流：',
						monitorData: '7.6',
						monitorTypeUnit: 'A',
						showDataType: 0,
					},
					{
						monitorTypeName: '电压：',
						monitorData: '396',
						monitorTypeUnit: 'V',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
			{
				name: '1#泵',
				type: 'bengSGWFY',
				position: '-24.5872 -6.3441 4.71018',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '频率：',
						monitorData: '34',
						monitorTypeUnit: 'Hz',
						showDataType: 0,
					},
					{
						monitorTypeName: '电流：',
						monitorData: '80',
						monitorTypeUnit: 'A',
						showDataType: 0,
					},
					{
						monitorTypeName: '电压：',
						monitorData: '220',
						monitorTypeUnit: 'V',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
			{
				name: 'bengSGWFY',
				type: 'bengSGWFY',
				position: '-60.4665 -6.3441 4.71018',
			},
			{
				name: 'dimianSGWFY',
				type: 'dimianSGWFY',
				position: '-56.2902 -61.9769 42.3709',
			},
			{
				name: 'dizuoSGWFY',
				type: 'dizuoSGWFY',
				position: '-11.9599 8.9246 -12.4468',
			},
			{
				name: 'guandaoBXGSGWFY',
				type: 'guandaoBXGSGWFY',
				position: '18.4641 40.1433 -54.4543',
			},
			{
				name: 'kongzhiguiSGWFY',
				type: 'kongzhiguiSGWFY',
				position: '-186.469 30.5336 185.338',
			},
			{
				name: '出口流量',
				type: 'liuliangjiSGWFY',
				position: '76.5237 25.0628 41.7808',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '累计流量：',
						monitorData: '869',
						monitorTypeUnit: 'm³',
						showDataType: 0,
					},
					{
						monitorTypeName: '瞬时流量：',
						monitorData: '32',
						monitorTypeUnit: 'm³/h',
						showDataType: 0,
					},
				],
				labelScale: 0.5,
			},
			{
				name: 'shuixiangSGWFY',
				type: 'shuixiangSGWFY',
				position: '-232.051 90.6312 32.4345',
			},
			{
				name: 'shuixiangSGWFY',
				type: 'shuixiangSGWFY',
				position: '-232.051 31.5269 32.4345',
			},
			{
				name: '出口压力',
				type: 'yalijiSGWFY',
				position: '-45.4043 27.9021 42.552',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '压力：',
						monitorData: '0.5',
						monitorTypeUnit: 'Mpa',
						showDataType: 0,
					},
				],
				labelScale: 0.6,
			},
			{
				name: '进口压力',
				type: 'yalijiSGWFY',
				position: '109.228 -0.074598 -86.1181',
				showLabelType: 1,
				labelContent: [
					{
						monitorTypeName: '压力：',
						monitorData: '0.23',
						monitorTypeUnit: 'Mpa',
						showDataType: 0,
					},
				],
				labelScale: 0.6,
			},
		]
	},
	getObjectDataSGWFY() {
		let arr = this.getObjectDataSGWFYArray()
		return this.dealPositionData({ allArr: arr })
	},
	getObjectDataALARMSGWFY() {
		let arr = this.getObjectDataSGWFYArray()
		const newArr = arr.map(item => {
			if (item.type === 'yalijiSGWFY') {
				item.alarmPrompt = true
			}
			if (item.type === 'yalijiSGWFY' && item.name === '出口压力') {
				// debugger;
				item.labelContent[0].alarm = true
				item.labelContent[0].monitorData = '0.39'
			}
			return { ...item }
		})
		return this.dealPositionData({ allArr: newArr })
	},
	//高新区水厂
	getObjDataGXQSCglb() {
		let arr = [
			{
				name: 'architecture1',
				type: 'architecture1GXQGLB',
				position: '-428.716 323.977 128.73',
			},
			{
				name: 'architecture2',
				type: 'architecture2GXQGLB',
				position: '2178.74 777.935 3474.31',
			},
			{
				name: 'architecture3',
				type: 'architecture3GXQGLB',
				position: '8398.52 965.202 9947.7',
			},
			{
				name: 'architecture4',
				type: 'architecture4GXQGLB',
				position: '6643.78 557.923 133.502',
			},
			{
				name: 'architecture5',
				type: 'architecture5GXQGLB',
				position: '1465.66 408.281 -2306.07',
			},
			{
				name: 'architecture6',
				type: 'architecture6GXQGLB',
				position: '9152.61 319.661 131.521',
			},
			{
				name: 'grass1',
				type: 'grass1GXQGLB',
				position: '-914.624 88.2401 -1940.15',
			},
			{
				name: 'grass2',
				type: 'grass2GXQGLB',
				position: '6193.09 39.8562 5866.4',
			},
			{
				name: 'grass3',
				type: 'grass3GXQGLB',
				position: '12813.4 38.8783 2938.4',
			},
			{
				name: 'grass4',
				type: 'grass4GXQGLB',
				position: '8122.5 250.611 4189.28',
			},
			{
				name: 'grass5',
				type: 'grass5GXQGLB',
				position: '1587.83 113.104 -2344.73',
			},
			{
				name: 'ground',
				type: 'groundGXQGLB',
				position: '6247.31 0 4389.79',
			},
			{
				name: 'langan',
				type: 'langanGXQGLB',
				position: '6430.48 169.038 4448.54',
			},
			{
				name: 'light',
				type: 'lightGXQGLB',
				position: '7168.74 438.199 2722.74',
			},
			{
				name: 'tree',
				type: 'treeGXQGLB',
				position: '6036.27 648.726 2169.87',
			},
		]
		return this.dealPositionData({ allArr: arr })
	},
	//玉皇阁水厂沙盘
	getObjDataYHGGLB() {
		let arr = [
			{
				name: 'B0YHGGLB',
				type: 'B0YHGGLB',
				position: '6849.08 321.123 20121.6',
			},
			{
				name: 'B1YHGGLB',
				type: 'B1YHGGLB',
				position: '12090.3 251.119 19259.4',
			},
			{
				name: 'B2YHGGLB',
				type: 'B2YHGGLB',
				position: '10377.1 1478.88 7194.16',
			},
			{
				name: 'B3YHGGLB',
				type: 'B3YHGGLB',
				position: '-6100.83 1679.75 1041',
			},
			{
				name: 'B4YHGGLB',
				type: 'B4YHGGLB',
				position: '12071.2 1840.86 -3095.19',
			},
			{
				name: 'B5YHGGLB',
				type: 'B5YHGGLB',
				position: '3854.31 624.722 -4223.68',
			},
			{
				name: 'B6YHGGLB',
				type: 'B6YHGGLB',
				position: '4967.38 688.264 -11768.8',
			},
			{
				name: 'B7YHGGLB',
				type: 'B7YHGGLB',
				position: '9988.6 546.199 -12007.6',
			},
			{
				name: 'B8YHGGLB',
				type: 'B8YHGGLB',
				position: '16478.1 750.831 -12549.5',
			},
			{
				name: 'B9YHGGLB',
				type: 'B9YHGGLB',
				position: '4750.44 1059.6 -14989.3',
			},
			{
				name: 'B10YHGGLB',
				type: 'B10YHGGLB',
				position: '-14741.8 879.994 3624',
			},
			{
				name: 'B11YHGGLB',
				type: 'B11YHGGLB',
				position: '-12728 1155.07 14463',
			},
			{
				name: 'B12YHGGLB',
				type: 'B12YHGGLB',
				position: '-14713.9 862.454 -6260.94',
			},
			{
				name: 'B13YHGGLB',
				type: 'B13YHGGLB',
				position: '-7287.93 841.566 18937.6',
			},
			{
				name: 'B14HGGLB',
				type: 'B14YHGGLB',
				position: '-13188.3 981.304 -15011.5',
			},
			{
				name: 'B15YHGGLB',
				type: 'B15YHGGLB',
				position: '-6639.85 743.282 16827.1',
			},
			{
				name: 'G1YHGGLB',
				type: 'G1YHGGLB',
				position: '-3517.4 0.381366 -713.641',
			},
			{
				name: 'G2YHGGLB',
				type: 'G2YHGGLB',
				position: '10540.5 280.557 18164.8',
			},
			{
				name: 'G3YHGGLB',
				type: 'G3YHGGLB',
				position: '10378.4 39.8247 7674.05',
			},
			{
				name: 'G4YHGGLB',
				type: 'G4YHGGLB',
				position: '10784.6 282.256 -2973.33',
			},
			{
				name: 'G5YHGGLB',
				type: 'G5YHGGLB',
				position: '10900.8 282.256 -13430.8',
			},
			{
				name: 'G6YHGGLB',
				type: 'G6YHGGLB',
				position: '-10070.5 20 -2279.6',
			},
			{
				name: 'lightYHGGLB',
				type: 'lightYHGGLB',
				position: '2889.79 496.198 659.673',
			},
			{
				name: 'roadYHGGLB',
				type: 'roadYHGGLB',
				position: '1571.59 -152.059 1050.02',
			},
			{
				name: 'solar panel',
				type: 'solar panel',
				position: '-3458.92 321.48 -172.481',
			},
			{
				name: 'treeYHGGLB',
				type: 'treeYHGGLB',
				position: '3426.13 986.92 6190.59',
			},
		]
		return this.dealPositionData({ allArr: arr })
	},

	/**
	 * 以下为管线和相机数据
	 * */

	//老合台三维场景（相机起始位置）
	getPositionLHTSWMX() {
		const endPosition = new THREE.Vector3(5785.143735107162, 4069.4392351071624, 6468.274735107162)
		const endTarget = new THREE.Vector3(-423.9050000000002, -2139.6095, 259.226)
		const startPosition = new THREE.Vector3(12244.388743637803, 10528.684243637803, 12927.519743637804)
		const startTarget = new THREE.Vector3(-423.9050000000002, -2139.6095, 259.226)
		return { endPosition, endTarget, startPosition, startTarget }
	},
	//CBD泵站工艺（相机起始位置）
	getPositionCBDBZ() {
		const endPosition = new THREE.Vector3(431.1637, 480.2046, 600.0119)
		const endTarget = new THREE.Vector3(-62.4064, -13.3655, 106.4418)
		const startPosition = new THREE.Vector3(106.4418, 2128.7417, 2248.549)
		const startTarget = new THREE.Vector3(-62.4064, -13.3655, 106.4418)
		return { endPosition, endTarget, startPosition, startTarget }
	},
	//汝城加药间（相机起始位置）
	getGuandaoDataJYJglb() {
		const endPosition = new THREE.Vector3(109.80274025368307, 114.93694025368308, 207.83359025368307)
		const endTarget = new THREE.Vector3(-24.6093, -19.4751, 73.42155)
		const startPosition = new THREE.Vector3(434.23075828747335, 439.36495828747337, 532.2616082874733)
		const startTarget = new THREE.Vector3(-24.6093, -19.4751, 73.42155)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
		}
	},
	//汝城泵房（相机起始位置）
	getGuandaoDataRCBFglb() {
		const endPosition = new THREE.Vector3(512.7311026415366, 650.1748026415365, 671.5575026415365)
		const endTarget = new THREE.Vector3(-20.802699999999987, 116.64099999999999, 138.0237)
		const startPosition = new THREE.Vector3(2204.993767768713, 2342.4374677687133, 2363.8201677687134)
		const startTarget = new THREE.Vector3(-20.802699999999987, 116.64099999999999, 138.0237)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
		}
	},
	//二台子水厂沙盘 （相机起始位置）
	getGuandaoDataEHTglb() {
		const guanDaoRadius = {
			pointsRadius: 75,
		}
		let points = []

		points.push([
			this.getRealVector3('-5100.19 148.139 -1173.54'),
			this.getRealVector3('-5128.32 148.139 -671.302'),
			this.getRealVector3('-10426.8 148.139 -671.302'),
		])
		points.push([
			this.getRealVector3('-2319.91 148.139 -6250.53'),
			this.getRealVector3('-2319.91 148.139 -5885.36'),
			this.getRealVector3('-5100.19 148.139 -5885.36'),
			this.getRealVector3('-5100.19 148.139 -4911.71'),
		])
		points.push([
			this.getRealVector3('-4677.38 188.325 -10880.7'),
			this.getRealVector3('-4642.64 188.325 -10643.7'),
			this.getRealVector3('-1167.21 188.325 -10643.7'),
			this.getRealVector3('-1167.21 188.325 -15253.1'),
			this.getRealVector3('-218.575 188.325 -15253.1'),
		])
		points.push([
			this.getRealVector3('-6087.46 506.249 -15948.9'),
			this.getRealVector3('-7813.78 506.249 -15948.9'),
			this.getRealVector3('-7813.78 506.249 -7973.82'),
			this.getRealVector3('-7295.68 506.249 -7956.01'),
		])
		points.push([
			this.getRealVector3('-10758.4 649.192 -23211.9'),
			this.getRealVector3('-10758.4 649.192 -21277.8'),
			this.getRealVector3('-4610.56 649.192 -21261.9'),
		])
		points.push([
			this.getRealVector3('-3915.12 649.192 -23211.9'),
			this.getRealVector3('-3915.12 649.192 -22299.8'),
			this.getRealVector3('-4610.56 649.192 -22299.8'),
			this.getRealVector3('-4610.56 649.192 -20766.8'),
			this.getRealVector3('-4610.56 649.192 -21261.9'),
		])
		points.push([
			this.getRealVector3('-3873.47 901.189 -26907.2'),
			this.getRealVector3('-3873.47 901.189 -24909.2'),
		])

		points.push([
			this.getRealVector3('7777.711 663.901 -20873.366'),
			this.getRealVector3('10119.917 663.901 -20873.366'),
		])
		// const endPosition = new THREE.Vector3(
		//     6777.590154881038,
		//     17269.144654881038,
		//     19894.47985488104
		// );
		// const endTarget = new THREE.Vector3(
		//     -12571.3745,
		//     -2079.82,
		//     545.5151999999999
		// );
		const endPosition = new THREE.Vector3(
			// 6777.590154881038,
			// 17269.144654881038,
			// 29004.47985488104 // 设置是否面向自己
			10777.590154881038,
			17269.144654881038,
			19894.47985488104,
		)
		const endTarget = new THREE.Vector3(
			// -9571.3745,
			// 6079.82,
			// 545.5151999999999
			-12571.3745,
			179.82,
			545.5151999999999,
		)
		const startPosition = new THREE.Vector3(26722.24271466532, 37213.79721466532, 39839.13241466532)
		const startTarget = new THREE.Vector3(-12571.3745, -2079.82, 545.5151999999999)
		return {
			points,
			endPosition,
			endTarget,
			startPosition,
			startTarget,
			guanDaoRadius,
			processFlowDiagramName: '水务水厂测试1',
		}
	},
	//苍南天信
	getGuandaoDataCNTXglb() {
		const endPosition = new THREE.Vector3(
			344.7590154881038,
			391.9144654881038,
			402.447985488104,
			// 6777.590154881038,
			// 17269.144654881038,
			// 19894.47985488104
		)
		const endTarget = new THREE.Vector3(-136.758, 29.651, 112.6)
		const startPosition = new THREE.Vector3(26722.24271466532, 37213.79721466532, 39839.13241466532)
		const startTarget = new THREE.Vector3(311.51873293109793, 409.57008689244503, 458.716)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
			processFlowDiagramName: '苍南天信',
			// factor:2
		}
	},
	getGuandaoDataSGWFYglb() {
		const endPosition = new THREE.Vector3(344.7590154881038, 391.9144654881038, 402.447985488104)
		const endTarget = new THREE.Vector3(0, 0, 0)
		const startPosition = new THREE.Vector3(26722.24271466532, 37213.79721466532, 39839.13241466532)
		const startTarget = new THREE.Vector3(311.51873293109793, 409.57008689244503, 458.716)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
			processFlowDiagramName: '苍南天信',
			// factor:2
		}
	},
	//章山水厂沙盘 （相机起始位置）
	getGuandaoDataZSglb() {
		const endPosition = new THREE.Vector3(
			// 6777.590154881038,
			// 17269.144654881038,
			// 29004.47985488104 // 设置是否面向自己
			11777.590154881038,
			269.144654881038,
			6894.47985488104,
		)
		const endTarget = new THREE.Vector3(
			// -9571.3745,
			// 6079.82,
			// 545.5151999999999
			-3620.47,
			4040.91,
			1608.33,
		)
		const startPosition = new THREE.Vector3(26722.24271466532, 37213.79721466532, 39839.13241466532)
		const startTarget = new THREE.Vector3(-12571.3745, -2079.82, 545.5151999999999)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
			processFlowDiagramName: '章山',
			factor: 2,
		}
	},
	//章山水厂沙盘 （相机起始位置）
	getGuandaoDataZSALARMglb() {
		const endPosition = new THREE.Vector3(
			// 6777.590154881038,
			// 17269.144654881038,
			// 29004.47985488104 // 设置是否面向自己
			11777.590154881038,
			269.144654881038,
			6894.47985488104,
		)
		const endTarget = new THREE.Vector3(
			// -9571.3745,
			// 6079.82,
			// 545.5151999999999
			// -3620.47,
			// 4040.91,
			// 1608.33
			-5621.86,
			39.796,
			2515.48,
		)
		const startPosition = new THREE.Vector3(26722.24271466532, 37213.79721466532, 39839.13241466532)
		const startTarget = new THREE.Vector3(-12571.3745, -2079.82, 545.5151999999999)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
			processFlowDiagramName: '章山',
			factor: 2,
		}
	},

	getRealVector3(str) {
		let pointString = str.split(' ')
		return new THREE.Vector3(Number(pointString[2]), Number(pointString[0]), Number(pointString[1]))
	},
	//高新区水厂
	getPositionGXQSC() {
		const endPosition = new THREE.Vector3(14776.632112600699, 17692.319112600697, 12225.532112600698)
		const endTarget = new THREE.Vector3(3033.7010000000005, 5949.388, 482.601)
		const startPosition = new THREE.Vector3(17692.319112600697, 8709.230112600697, 12225.532112600698)
		const startTarget = new THREE.Vector3(949.388, -3033.7010000000005, 482.601)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
		}
	},
	//玉皇阁水厂沙盘
	getPositionYHGGLB() {
		const endPosition = new THREE.Vector3(30573.875054838405, 27150.675054838404, 30482.364987838402)
		const endTarget = new THREE.Vector3(868.1499999999996, -2555.0499999999993, 776.6399329999999)
		const startPosition = new THREE.Vector3(62821.94829403007, 59398.74829403007, 62730.43822703007)
		const startTarget = new THREE.Vector3(868.1499999999996, -2555.0499999999993, 776.6399329999999)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
		}
	},
	// 组装管道数据
	getGuandaoData({ endTargetData, processFlowDiagramName = '' }) {
		const endTargetDataArr = endTargetData.split(' ')
		const endPosition = new THREE.Vector3(344.7590154881038, 391.9144654881038, 402.447985488104)
		const endTarget = new THREE.Vector3(
			Number(endTargetDataArr[0]),
			Number(endTargetDataArr[1]),
			Number(endTargetDataArr[2]),
		)
		const startPosition = new THREE.Vector3(26722.24271466532, 37213.79721466532, 39839.13241466532)
		const startTarget = new THREE.Vector3(311.51873293109793, 409.57008689244503, 458.716)
		return {
			endPosition,
			endTarget,
			startPosition,
			startTarget,
			processFlowDiagramName,
		}
	},
}
