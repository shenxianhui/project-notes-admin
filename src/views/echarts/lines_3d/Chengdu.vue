/*
 * @Author: ShenXianhui 
 * @Date: 2019-03-26 10:37:48 
 * @Last Modified by: ShenXianhui
 * @Last Modified time: 2019-03-27 10:47:45
 */
<!-- 成都出租车路线 -->
<template>
    <div class="lines-3d-chengdu" id="lines-3d-chengdu"></div>
</template>

<script>
import Lines from '@/assets/data/echarts/lines_3d/chengdu.json';

export default {
    name: 'lines3DChengdu',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    mounted() {
        this.getLines();
    },
    methods: {
        getLines() {
            var myChart = this.$echarts.init(document.getElementById('lines-3d-chengdu'));

            var geoDData = {
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Bird Exhibit",
                            "height": 0,
                            "base_height": 0,
                            "color": "orange"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.078312,
                                        30.640282
                                    ],
                                    [
                                        104.07832,
                                        30.640674
                                    ],
                                    [
                                        104.078087,
                                        30.640676
                                    ],
                                    [
                                        104.078087,
                                        30.640661
                                    ],
                                    [
                                        104.077423,
                                        30.64067
                                    ],
                                    [
                                        104.077416,
                                        30.6403
                                    ],
                                    [
                                        104.078312,
                                        30.640282
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "06e8fa0b3f851e3ae0e1da5fc17e111e"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Bird Exhibit",
                            "height":180,
                            "base_height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077808,
                                        30.640266
                                    ],
                                    [
                                        104.077806,
                                        30.640293
                                    ],
                                    [
                                        104.077415,
                                        30.640298
                                    ],
                                    [
                                        104.077424,
                                        30.640671
                                    ],
                                    [
                                        104.077382,
                                        30.640669
                                    ],
                                    [
                                        104.077371,
                                        30.640274
                                    ],
                                    [
                                        104.077808,
                                        30.640266
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "08a10ab2bf15c4d14669b588062f7f08"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "East Hallway",
                            "base_height": 0,
                            "height": 0,
                            "color": "indigo"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076704,
                                        30.640141
                                    ],
                                    [
                                        104.076707,
                                        30.640338
                                    ],
                                    [
                                        104.07572,
                                        30.640355
                                    ],
                                    [
                                        104.07572,
                                        30.640148
                                    ],
                                    [
                                        104.076704,
                                        30.640141
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "09ead44537d94ece576c7bc001c33e53"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "East Entrance",
                            "base_height": 0,
                            "height": 0,
                            "color": "violet"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.07544,
                                        30.640149
                                    ],
                                    [
                                        104.075449,
                                        30.640358
                                    ],
                                    [
                                        104.075721,
                                        30.640355
                                    ],
                                    [
                                        104.07572,
                                        30.640143
                                    ],
                                    [
                                        104.07544,
                                        30.640149
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "12251ebf764b36cf3b8c5ad42e2deb29"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "height": 0,
                            "base_height": 0,
                            "level": 1,
                            "name": "Under the Earth",
                            "color": "red"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076701,
                                        30.640816
                                    ],
                                    [
                                        104.076705,
                                        30.640115
                                    ],
                                    [
                                        104.075712,
                                        30.640125
                                    ],
                                    [
                                        104.075706,
                                        30.640802
                                    ],
                                    [
                                        104.075936,
                                        30.640801
                                    ],
                                    [
                                        104.075938,
                                        30.640824
                                    ],
                                    [
                                        104.076701,
                                        30.640816
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "1ce4f8c186a40b9927006644e27bfd69"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Atrium",
                            "base_height": 0,
                            "height": 0,
                            "color": "yellow"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077365,
                                        30.640799
                                    ],
                                    [
                                        104.0767,
                                        30.640815
                                    ],
                                    [
                                        104.076718,
                                        30.640672
                                    ],
                                    [
                                        104.077384,
                                        30.64067
                                    ],
                                    [
                                        104.077365,
                                        30.640799
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "369f5d8865e677120b7576b1de6082eb"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Ancient Egypt",
                            "height": 0,
                            "base_height": 0,
                            "color": "blue"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.07807,
                                        30.640761
                                    ],
                                    [
                                        104.078299,
                                        30.640758
                                    ],
                                    [
                                        104.078307,
                                        30.640139
                                    ],
                                    [
                                        104.077407,
                                        30.64015
                                    ],
                                    [
                                        104.077399,
                                        30.640799
                                    ],
                                    [
                                        104.07807,
                                        30.640789
                                    ],
                                    [
                                        104.07807,
                                        30.640761
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "3e9f198afe6d7dff01ac81c6eaa511fb"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "West Arch",
                            "height":180,
                            "base_height": 30,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077424,
                                        30.64067
                                    ],
                                    [
                                        104.077384,
                                        30.64067
                                    ],
                                    [
                                        104.077365,
                                        30.640799
                                    ],
                                    [
                                        104.077405,
                                        30.640799
                                    ],
                                    [
                                        104.077424,
                                        30.64067
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "402706f28b793d27c78d9615fff747f2"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Bird Exhibit",
                            "height":180,
                            "base_height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.078312,
                                        30.640283
                                    ],
                                    [
                                        104.07797,
                                        30.640288
                                    ],
                                    [
                                        104.077972,
                                        30.640265
                                    ],
                                    [
                                        104.078312,
                                        30.640259
                                    ],
                                    [
                                        104.078312,
                                        30.640283
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "43e1e2fc8399dee075ad59764f2a2878"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "name": "Arch",
                            "level": 1,
                            "color": "white",
                            "base_height": 30,
                            "height":180
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077971,
                                        30.640291
                                    ],
                                    [
                                        104.077973,
                                        30.640265
                                    ],
                                    [
                                        104.077805,
                                        30.640267
                                    ],
                                    [
                                        104.077806,
                                        30.640294
                                    ],
                                    [
                                        104.077971,
                                        30.640291
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "4528ad9b9264cbec65bb2e55ac0012c1"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "color": "white",
                            "base_height": 30,
                            "height":180,
                            "name": "Arch"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077979,
                                        30.640167
                                    ],
                                    [
                                        104.077797,
                                        30.640168
                                    ],
                                    [
                                        104.077799,
                                        30.640145
                                    ],
                                    [
                                        104.077976,
                                        30.640144
                                    ],
                                    [
                                        104.077979,
                                        30.640167
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "4be6817c3b595042c8d971eebd0c4fd3"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "name": "Kids Zone",
                            "level": 1,
                            "base_height": 0,
                            "height": 0,
                            "color": "green"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076718,
                                        30.640675
                                    ],
                                    [
                                        104.076709,
                                        30.640371
                                    ],
                                    [
                                        104.075725,
                                        30.640381
                                    ],
                                    [
                                        104.075732,
                                        30.640711
                                    ],
                                    [
                                        104.07596,
                                        30.640711
                                    ],
                                    [
                                        104.07596,
                                        30.640688
                                    ],
                                    [
                                        104.076718,
                                        30.640675
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "5775eba03674ea1cb3550ffb38321432"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "color": "white",
                            "name": "Arch",
                            "height":180,
                            "base_height": 30
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076286,
                                        30.640119
                                    ],
                                    [
                                        104.076286,
                                        30.640144
                                    ],
                                    [
                                        104.076089,
                                        30.640149
                                    ],
                                    [
                                        104.076086,
                                        30.64012
                                    ],
                                    [
                                        104.076286,
                                        30.640119
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "598832b1512dc9facc855c5367251531"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Arch",
                            "color": "white",
                            "height":180,
                            "base_height": 30
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076287,
                                        30.640343
                                    ],
                                    [
                                        104.076288,
                                        30.640374
                                    ],
                                    [
                                        104.076076,
                                        30.640378
                                    ],
                                    [
                                        104.076077,
                                        30.640347
                                    ],
                                    [
                                        104.076287,
                                        30.640343
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "59ed13d4411ff5f88714d9af539788d2"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "color": "white",
                            "name": "center_arch",
                            "base_height": 30,
                            "height":180
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.07737,
                                        30.640198
                                    ],
                                    [
                                        104.077372,
                                        30.64024
                                    ],
                                    [
                                        104.076708,
                                        30.640243
                                    ],
                                    [
                                        104.076708,
                                        30.640203
                                    ],
                                    [
                                        104.07737,
                                        30.640198
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "67f8952a18dfe21ee0744a3e86bc41d8"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Kids Zone",
                            "height": 0,
                            "base_height": 40,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.075719,
                                        30.640354
                                    ],
                                    [
                                        104.075718,
                                        30.640381
                                    ],
                                    [
                                        104.076077,
                                        30.640378
                                    ],
                                    [
                                        104.076077,
                                        30.640347
                                    ],
                                    [
                                        104.075719,
                                        30.640354
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "6bb2c92386bcf4678113d6b3e400ae3b"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Under the Earth",
                            "height":180,
                            "base_height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076089,
                                        30.640149
                                    ],
                                    [
                                        104.076089,
                                        30.640119
                                    ],
                                    [
                                        104.075711,
                                        30.640124
                                    ],
                                    [
                                        104.075713,
                                        30.640147
                                    ],
                                    [
                                        104.076089,
                                        30.640149
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "844c87987089df6b9db3923f6a00e4d6"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Under the Earth",
                            "height":180,
                            "base_height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076707,
                                        30.640115
                                    ],
                                    [
                                        104.076286,
                                        30.640119
                                    ],
                                    [
                                        104.076285,
                                        30.640144
                                    ],
                                    [
                                        104.076705,
                                        30.640141
                                    ],
                                    [
                                        104.076707,
                                        30.640115
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "85547a1ecdbd2ca1fdc6324aea3c6b70"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "North Entrance",
                            "height": 0,
                            "base_height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077386,
                                        30.64067
                                    ],
                                    [
                                        104.077388,
                                        30.640786
                                    ],
                                    [
                                        104.077228,
                                        30.640786
                                    ],
                                    [
                                        104.077226,
                                        30.640848
                                    ],
                                    [
                                        104.076867,
                                        30.640849
                                    ],
                                    [
                                        104.076868,
                                        30.640791
                                    ],
                                    [
                                        104.076718,
                                        30.640791
                                    ],
                                    [
                                        104.076718,
                                        30.640672
                                    ],
                                    [
                                        104.077386,
                                        30.64067
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "91ab1ee01729c33568c7b57eb258e699"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Ancient Egypt",
                            "height":180,
                            "base_height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077394,
                                        30.640799
                                    ],
                                    [
                                        104.077405,
                                        30.64015
                                    ],
                                    [
                                        104.077802,
                                        30.640147
                                    ],
                                    [
                                        104.0778,
                                        30.640167
                                    ],
                                    [
                                        104.077369,
                                        30.640172
                                    ],
                                    [
                                        104.077364,
                                        30.640799
                                    ],
                                    [
                                        104.077394,
                                        30.640799
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "943171d55d207024791e15294def7e8f"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Ancient Egypt",
                            "height":180,
                            "base_height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077976,
                                        30.640166
                                    ],
                                    [
                                        104.077976,
                                        30.640143
                                    ],
                                    [
                                        104.078309,
                                        30.640139
                                    ],
                                    [
                                        104.078309,
                                        30.640161
                                    ],
                                    [
                                        104.077976,
                                        30.640166
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "a37230898905988cab9b72927dc99258"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "name": "West Hallway",
                            "level": 1,
                            "base_height": 0,
                            "height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.078309,
                                        30.640161
                                    ],
                                    [
                                        104.078312,
                                        30.64026
                                    ],
                                    [
                                        104.07737,
                                        30.640272
                                    ],
                                    [
                                        104.07737,
                                        30.64017
                                    ],
                                    [
                                        104.078309,
                                        30.640161
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "c7cc79da8711d746985f23a9b22c1d5e"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "Kids Zone",
                            "height":180,
                            "base_height": 0,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076286,
                                        30.640343
                                    ],
                                    [
                                        104.076286,
                                        30.640374
                                    ],
                                    [
                                        104.07671,
                                        30.640371
                                    ],
                                    [
                                        104.076708,
                                        30.640338
                                    ],
                                    [
                                        104.076286,
                                        30.640343
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "cfbf2aee6a73a45c12e7fc7432d6009e"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "South Entrance",
                            "height": 0,
                            "base_height": 0,
                            "color": "teal"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.077359,
                                        30.640801
                                    ],
                                    [
                                        104.077355,
                                        30.640674
                                    ],
                                    [
                                        104.077221,
                                        30.640677
                                    ],
                                    [
                                        104.077219,
                                        30.64059
                                    ],
                                    [
                                        104.076824,
                                        30.640595
                                    ],
                                    [
                                        104.076826,
                                        30.64068
                                    ],
                                    [
                                        104.076695,
                                        30.640683
                                    ],
                                    [
                                        104.0767,
                                        30.640813
                                    ],
                                    [
                                        104.077359,
                                        30.640801
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "d71ab89467076ad023161c37f4ff0d5f"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "East Arch",
                            "height":180,
                            "base_height": 30,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.076688,
                                        30.640675
                                    ],
                                    [
                                        104.076716,
                                        30.640675
                                    ],
                                    [
                                        104.076699,
                                        30.640814
                                    ],
                                    [
                                        104.076665,
                                        30.640814
                                    ],
                                    [
                                        104.076688,
                                        30.640675
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "dd2baec57e4079eb65dcae5be495da62"
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "level": 1,
                            "name": "outer-walls",
                            "base_height": 0,
                            "height":200,
                            "color": "white"
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        104.078087,
                                        30.64066
                                    ],
                                    [
                                        104.078087,
                                        30.640674
                                    ],
                                    [
                                        104.078319,
                                        30.640674
                                    ],
                                    [
                                        104.078298,
                                        30.640757
                                    ],
                                    [
                                        104.078326,
                                        30.640756
                                    ],
                                    [
                                        104.078347,
                                        30.640693
                                    ],
                                    [
                                        104.078068,
                                        30.640696
                                    ],
                                    [
                                        104.078067,
                                        30.640675
                                    ],
                                    [
                                        104.07741,
                                        30.640684
                                    ],
                                    [
                                        104.077416,
                                        30.640802
                                    ],
                                    [
                                        104.077247,
                                        30.640803
                                    ],
                                    [
                                        104.077246,
                                        30.640866
                                    ],
                                    [
                                        104.076846,
                                        30.640868
                                    ],
                                    [
                                        104.076848,
                                        30.640807
                                    ],
                                    [
                                        104.07669,
                                        30.640811
                                    ],
                                    [
                                        104.076693,
                                        30.640693
                                    ],
                                    [
                                        104.075992,
                                        30.640701
                                    ],
                                    [
                                        104.075992,
                                        30.640729
                                    ],
                                    [
                                        104.075703,
                                        30.640733
                                    ],
                                    [
                                        104.075689,
                                        30.640377
                                    ],
                                    [
                                        104.075412,
                                        30.640382
                                    ],
                                    [
                                        104.075411,
                                        30.640122
                                    ],
                                    [
                                        104.075689,
                                        30.640119
                                    ],
                                    [
                                        104.075682,
                                        30.640781
                                    ],
                                    [
                                        104.075966,
                                        30.640779
                                    ],
                                    [
                                        104.075969,
                                        30.640798
                                    ],
                                    [
                                        104.076669,
                                        30.640794
                                    ],
                                    [
                                        104.076663,
                                        30.640662
                                    ],
                                    [
                                        104.0768,
                                        30.640661
                                    ],
                                    [
                                        104.076796,
                                        30.640571
                                    ],
                                    [
                                        104.07726,
                                        30.640559
                                    ],
                                    [
                                        104.077258,
                                        30.640654
                                    ],
                                    [
                                        104.077388,
                                        30.640652
                                    ],
                                    [
                                        104.077395,
                                        30.640778
                                    ],
                                    [
                                        104.078045,
                                        30.640773
                                    ],
                                    [
                                        104.078044,
                                        30.640742
                                    ],
                                    [
                                        104.078325,
                                        30.640739
                                    ],
                                    [
                                        104.078326,
                                        30.640758
                                    ],
                                    [
                                        104.07807,
                                        30.640761
                                    ],
                                    [
                                        104.07807,
                                        30.640789
                                    ],
                                    [
                                        104.077356,
                                        30.6408
                                    ],
                                    [
                                        104.077356,
                                        30.640672
                                    ],
                                    [
                                        104.077218,
                                        30.640677
                                    ],
                                    [
                                        104.077215,
                                        30.64059
                                    ],
                                    [
                                        104.076822,
                                        30.640595
                                    ],
                                    [
                                        104.076827,
                                        30.64068
                                    ],
                                    [
                                        104.076694,
                                        30.640681
                                    ],
                                    [
                                        104.076697,
                                        30.640813
                                    ],
                                    [
                                        104.075939,
                                        30.640824
                                    ],
                                    [
                                        104.075937,
                                        30.6408
                                    ],
                                    [
                                        104.075706,
                                        30.640802
                                    ],
                                    [
                                        104.075713,
                                        30.640143
                                    ],
                                    [
                                        104.075441,
                                        30.64015
                                    ],
                                    [
                                        104.07545,
                                        30.640357
                                    ],
                                    [
                                        104.075724,
                                        30.640353
                                    ],
                                    [
                                        104.075733,
                                        30.640712
                                    ],
                                    [
                                        104.075959,
                                        30.64071
                                    ],
                                    [
                                        104.075959,
                                        30.640688
                                    ],
                                    [
                                        104.076719,
                                        30.640672
                                    ],
                                    [
                                        104.07672,
                                        30.640791
                                    ],
                                    [
                                        104.076869,
                                        30.64079
                                    ],
                                    [
                                        104.076868,
                                        30.64085
                                    ],
                                    [
                                        104.077223,
                                        30.640847
                                    ],
                                    [
                                        104.077227,
                                        30.640786
                                    ],
                                    [
                                        104.077387,
                                        30.640785
                                    ],
                                    [
                                        104.077383,
                                        30.64067
                                    ],
                                    [
                                        104.078087,
                                        30.64066
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        },
                        "id": "ef6512f46485e27963c248bcc945c3db"
                    }
                ],
                "type": "FeatureCollection"
            }

            var taxiRoutes = [];
            var data = Lines;
            var hStep = 300 / (data.length - 1);

            var i = 0;
            for (var x in data) {
                var line = data[x];
                var pointString = line.ROAD_LINE;
                var pointArr = pointString.split(';');
                var lnglats = [];
                for (var j in pointArr) {
                    lnglats.push(pointArr[j].split(','));
                }
                taxiRoutes.push({
                    coords: lnglats,
                    lineStyle: {}
                });
            }

            function rotateCamera(timestamp) {
                map.rotateTo((timestamp / 100) % 360, {
                    duration: 5
                });
                requestAnimationFrame(rotateCamera);
            }

            var option = {
                mapbox: {
                    style: 'mapbox://styles/mapbox/dark-v9',
                    center: [104.070, 30.650],
                    zoom: 15,
                    pitch: 60,
                    bearing: -17.6,
                    postEffect: {
                        enable: true,
                        FXAA: {
                            enable: true
                        }
                    },
                    light: {
                        main: {
                            intensity: 1,
                            shadow: true,
                            shadowQuality: 'high'
                        },
                        ambient: {
                            intensity: 0
                        },
                        ambientCubemap: {
                            texture: '/asset/get/s/data-1491838644249-ry33I7YTe.hdr',
                            exposure: 1,
                            diffuseIntensity: 0.5,
                            specularIntensity: 2
                        }
                    },
                    // container: 'map',
                    localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
                },
                series: [{
                    type: 'lines3D',

                    coordinateSystem: 'mapbox',

                    effect: {
                        show: true,
                        constantSpeed: 5,
                        trailWidth: 2,
                        trailLength: 0.4,
                        trailOpacity: 1,
                        spotIntensity: 10
                    },

                    blendMode: 'lighter',

                    polyline: true,

                    lineStyle: {
                        width: 0.1,
                        color: 'rgb(200, 40, 0)',
                        opacity: 0
                    },

                    data: taxiRoutes
                }]
            };
            myChart.setOption(option);

            // 底图渲染
            var map = myChart.getModel().getComponent('mapbox3D').getMapbox();
            map.on('load', function() {

                // Insert the layer beneath any symbol layer.
                var layers = map.getStyle().layers;
                map.flyTo({
                    center: [104.076, 30.645],
                    speed: 0.8,
                    curve: 1,
                    easing(t) {
                        return t;
                    }
                });

                var labelLayerId;
                for (var i = 0; i < layers.length; i++) {
                    if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                        labelLayerId = layers[i].id;
                        break;
                    }
                }

                map.addLayer({
                    'id': '3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#fff',

                        // use an 'interpolate' expression to add a smooth transition effect to the
                        // buildings as the user zooms in
                        'fill-extrusion-height': [
                            "interpolate", ["linear"],
                            ["zoom"],
                            15, 0,
                            15.05, ["get", "height"]
                        ],
                        'fill-extrusion-base': [
                            "interpolate", ["linear"],
                            ["zoom"],
                            15, 0,
                            15.05, ["get", "min_height"]
                        ],
                        'fill-extrusion-opacity': .6
                    }
                }, labelLayerId);

                map.addLayer({
                    'id': 'room-extrusion',
                    'type': 'fill-extrusion',
                    'source': {
                        // GeoJSON Data source used in vector tiles, documented at
                        // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
                        'type': 'geojson',
                        'data': geoDData
                        // 'data': 'https://www.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson'
                    },
                    'paint': {
                        // See the Mapbox Style Specification for details on data expressions.
                        // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions

                        // Get the fill-extrusion-color from the source 'color' property.
                        'fill-extrusion-color': ['get', 'color'],

                        // Get fill-extrusion-height from the source 'height' property.
                        'fill-extrusion-height': ['get', 'height'],

                        // Get fill-extrusion-base from the source 'base_height' property.
                        'fill-extrusion-base': ['get', 'base_height'],

                        // Make extrusions slightly opaque for see through indoor walls.
                        'fill-extrusion-opacity': 0.5
                    }
                });

                var layerss = ['country-label-lg', 'country-label-md', 'country-label-sm'];

                layerss.forEach(function(layer) {
                    map.setLayoutProperty(layer, 'text-field', ['format',
                        ['get', 'name_en'], { 'font-scale': 1.5 },
                        '\n', {},
                        ['get', 'name'], {
                            'font-scale': 1.2,
                            'text-font': ['literal', [ 'DIN Offc Pro Italic', 'Arial Unicode MS Regular' ]]
                        }
                    ]);
                });
                
                mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');

                map.addControl(new MapboxLanguage({
                    defaultLanguage: 'zh'
                }));

                // setTimeout(function() {
                //         map.setZoom(13);
                //     rotateCamera(0);
                // }, 30000);

                map.addControl(new mapboxgl.NavigationControl());
            });
        }
    }
};
</script>

<style scoped lang='less'>
.lines-3d-chengdu {
    width: 100%;
    height: 100%;
}
</style>
