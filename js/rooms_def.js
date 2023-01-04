
const Rooms = [
    // room 0
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 104, y: 56,
                obj: 'purple_house'
            }
        ],
        items: [
            {
                x: 128, y: 104,
                house: 'purple_house',
                visible: true,
                name: 'the_stone'
            }
        ]
    },
    // room 1
    {
        back: 'air',
        floor: 'air',
        details: [],
        items: []
    },
    // room 2
    {
        back: 'air',
        floor: 'air',
        details: [],
        items: []
    },
    // room 3
    {
        back: 'air',
        floor: 'air',
        details: [],
        items: []
    },
    // room 4
    {
        back: 'air',
        floor: 'air',
        details: [],
        items: []
    },
    // room 5
    {
        back: 'air',
        floor: 'air',
        details: [],
        items: []
    },
    // room 6
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 48, y: 72,
                obj: 'ladder_head' // This should be only visible when we put ladder into the room (18) below 
            }
        ],
        items: []
    },
    // room 7
    {
        back: 'air',
        floor: 'ground',
        details: [],
        items: []
    },
    // room 8
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 48, y: 72,
                obj: 'ladder_head'
            }
        ],
        items: []
    },
    // room 9
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 104, y: 56,
                obj: 'brown_house'
            }
        ],
        items: [
            {
                x: 120, y: 104,
                house: 'brown_house',
                visible: true,
                name: 'granate'
            },
            {
                x: 120 + 16, y: 104,
                house: 'brown_house',
                visible: true,
                name: 'granate'
            },
        ]
    },
    // room 10
    {
        back: 'air',
        floor: 'ground',
        details: [],
        items: []
    },
    // room 11
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 232, y: 56,
                obj: 'green_hut'
            }
        ],
        items: [
            {
                x: 320 - 48, y: 104,
                house: 'green_hut',
                visible: true,
                name: 'grey_key'
            },
        ]
    },
    // room 12
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 32, y: 56,
                obj: 'small_brown1_house'
            },
            {
                x: 224, y: 8,
                obj: 'tree'
            }
        ],
        items: [
            {
                x: 64 - 8,
                y: 104,
                house: 'small_brown1_house',
                visible: true,
                name: 'cross'
            },
        ]
    },
    // room 13
    {
        back: 'air',
        floor: 'water',
        details: [
            {
                x: 0, y: 120,
                obj: 'waterfront_left'
            },
            {
                x: 16, y: 120 + 16,
                obj: 'ground'
            }
        ],
        items: []
    },
    // room 14
    {
        back: 'air',
        floor: 'water',
        details: [],
        items: []
    },
    // room 15
    {
        back: 'air',
        floor: 'water',
        details: [],
        items: []
    },
    // room 16
    {
        back: 'air',
        floor: 'water',
        details: [
            {
                x: 304, y: 120,
                obj: 'waterfront_right'
            },
            {
                x: 304 - 16, y: 120 + 16,
                obj: 'ground'
            }
        ],
        items: []
    },
    // room 17
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 104, y: 56,
                obj: 'green_house'
            },
            {
                x: 32-8, y: 8,
                obj: 'tree'
            }
        ],
        items: [
            {
                x: 200 - 16,
                y: 104,
                house: 'green_house',
                visible: true,
                name: 'axe'
            },
        ]
    },
    // room 18
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 32-8, y: 8,
                obj: 'tree'
            },
            {
                x: 232, y: 8,
                obj: 'tree'
            }
        ],
        items: [
            {
                x: 160, y: 200-64-16-16,
                house: 'none',
                visible: false,
                name: 'lamp',
            }
        ]
    },
    // room 19
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 32 - 8, y: 56,
                obj: 'small_purple_house'
            },
            {
                x: 112 - 8, y: 56,
                obj: 'purple_house'
            },
        ],
        items: [
            {
                x: 120 + 16,
                y: 104,
                house: 'purple_house',
                visible: true,
                name: 'pistol'
            },
        ]
    },
    // room 20
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 48, y: 0,
                obj: 'ladder'
            }
        ],
        items: []
    },
    // room 21
    {
        back: 'air',
        floor: 'ground',
        details: [],
        items: []
    },
    // room 22
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 32, y: 56,
                obj: 'small_brown1_house'
            },
            {
                x: 224, y: 8,
                obj: 'tree'
            }
        ],
        items: [
            {
                x: 64 - 16,
                y: 104,
                house: 'small_brown1_house',
                visible: true,
                name: 'ladder'
            },
        ]
    },
    // room 23
    {
        back: 'air',
        floor: 'ground',
        details: [
            {
                x: 136, y: 96,
                obj: 'bush'
            },
            {
                x: 232, y: 56,
                obj: 'purple_hut'
            }
        ],
        items: [
            {
                x: 320 - 48, y: 104,
                house: 'purple_hut',
                visible: true,
                name: 'brown_key'
            }
        ]
    },
    // room 24 (fake)
    {
        back: 'rock',
        floor: 'rock',
        details: [],
        items: []
    },
    // room 25
    {
        back: 'water',
        floor: 'water',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_left'
            }
        ],
        items: []
    },
    // room 26
    {
        back: 'water',
        floor: 'water',
        details: [],
        items: []
    },
    // room 27
    {
        back: 'water',
        floor: 'water',
        details: [],
        items: []
    },
    // room 28
    {
        back: 'water',
        floor: 'water',
        details: [
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            }
        ],
        items: []
    },
    // room 29
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 48, y: 72,
                obj: 'ladder_head'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: []
    },
    // room 30
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: []
    },
    // room 31
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 48, y: 0,
                obj: 'ladder'
            }
        ],
        items: []
    },
    // room 32
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 136 + 24, y: 96,
                obj: 'debris'
            }
        ],
        items: []
    },
    // room 33
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 136 + 24, y: 96,
                obj: 'debris'
            },
            {
                x: 48, y: 72,
                obj: 'ladder_head'
            }
        ],
        items: []
    },
    // room 34
    {
        back: 'cave',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: (160-4*16)+0*16, y: 200-64-16,
                obj: 'water_left'
            },
            {
                x: (160-4*16)+1*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+2*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+3*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+4*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+5*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+6*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+7*16, y: 200-64-16,
                obj: 'water_right'
            },
            {
                x: 0*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 1*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 2*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 3*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 4*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 5*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+7*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+8*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+9*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+10*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+11*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+0*16+8, y: 200-64,
                obj: 'ground'
            },
            {
                x: (160-4*16)+7*16-8, y: 200-64,
                obj: 'ground'
            }
        ],
        items: [
            {
                x: 320 - 48, y: 104,
                house: 'none',
                visible: true,
                name: 'blue_key'
            }
        ]
    },
    // room 35
    {
        back: 'cave',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 0*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 1*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 2*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 3*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 4*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 5*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 6*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 7*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 8*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 9*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 10*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 11*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 12*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 13*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 14*16, y: 200-64-16,
                obj: 'rock'
            }
        ],
        items: [
            {
                x: 24 + 48, y: 104,
                house: 'none',
                visible: true,
                name: 'yellow_key'
            }
        ]
    },
    // room 36 (fake)
    {
        back: 'rock',
        floor: 'rock',
        details: [],
        items: []
    },
    // room 37
    {
        back: 'water',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 256 - 16, y: 200 - 64 - 16 - 40,
                obj: 'alga_flower'
            }
        ],
        items: [
            {
                x: 256 - 16, y: 200 - 64 - 16 - 16,
                house: 'none',
                visible: false,
                name: 'flower'
            },
        ]
    },
    // room 38
    {
        back: 'water',
        floor: 'rock',
        details: [
            {
                x: 104, y: 56,
                obj: 'purple_house'
            }
        ],
        items: []
    },
    // room 39
    {
        back: 'water',
        floor: 'rock',
        details: [
            {
                x: 104, y: 56,
                obj: 'green_house'
            },
            {
                x: 232, y: 56,
                obj: 'brown_hut'
            },
            {
                x: 16, y: 56,
                obj: 'small_brown1_house'
            }
        ],
        items: [
            {
                x: 256 + 8,
                y: 104,
                house: 'brown_hut',
                visible: true,
                name: 'spade'
            },
            {
                x: 24 + 8,
                y: 104,
                house: 'small_brown1_house',
                visible: true,
                name: 'granate'
            },
            {
                x: 24 + 16,
                y: 104,
                house: 'small_brown1_house',
                visible: true,
                name: 'granate'
            },
        ]
    },
    // room 40
    {
        back: 'water',
        floor: 'rock',
        details: [
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            }
        ],
        items: []
    },
    // room 41
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 48, y: 0,
                obj: 'ladder'
            },
            {
                x: 136 + 24, y: 96,
                obj: 'debris'
            }
        ],
        items: []
    },
    // room 42
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: []
    },
    // room 43
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            },
            {
                x: 104, y: 56,
                obj: 'brown_house'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: []
    },
    // room 44
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: [
            {
                x: 24 + 48, y: 104,
                house: 'none',
                visible: true,
                name: 'purple_key'
            }
        ]
    },
    // room 45 (dark)
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 48, y: 0,
                obj: 'ladder'
            }
        ],
        items: []
    },
    // room 46
    {
        back: 'cave',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 0*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 1*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 2*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 3*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 4*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 5*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+0*16, y: 200-64-16,
                obj: 'lava_left'
            },
            {
                x: (160-4*16)+1*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+2*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+3*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+4*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+5*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+6*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+7*16, y: 200-64-16,
                obj: 'lava_right'
            },
            {
                x: (160-4*16)+8*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+9*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+10*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+11*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+12*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+13*16, y: 200-64-16,
                obj: 'rock'
            }
        ],
        items: []
    },
    // room 47
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top_short'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 16, y: 56,
                obj: 'small_brown1_house'
            }
        ],
        items: [
            {
                x: 32 + 16 - 16, y: 200-64-16-16,
                house: 'small_brown1_house',
                visible: true,
                name: 'granate'
            }
        ]
    },
    // room 48
    {
        back: 'cave',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 0*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 1*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 2*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 3*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 4*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 5*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+0*16, y: 200-64-16,
                obj: 'lava_left'
            },
            {
                x: (160-4*16)+1*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+2*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+3*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+4*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+5*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+6*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: (160-4*16)+7*16, y: 200-64-16,
                obj: 'lava_right'
            },
            {
                x: (160-4*16)+8*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+9*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+10*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+11*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+12*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+13*16, y: 200-64-16,
                obj: 'rock'
            }
        ],
        items: []
    },
    // room 49
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 136 + 24, y: 96,
                obj: 'debris'
            }
        ],
        items: []
    },
    // room 50
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: []
    },
    // room 51 (dark)
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 48, y: 72,
                obj: 'ladder_head'
            }
        ],
        items: []
    },
    // room 52
    {
        back: 'cave',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 320 - 40 - 8, y: 200 - 64 - 16 - 48,
                obj: 'princess'
            },
            {
                x: (160-4*16)+0*16, y: 200-64-16,
                obj: 'water_left'
            },
            {
                x: (160-4*16)+1*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+2*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+3*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+4*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+5*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+6*16, y: 200-64-16,
                obj: 'water'
            },
            {
                x: (160-4*16)+7*16, y: 200-64-16,
                obj: 'water_right'
            },
            {
                x: 0*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 1*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 2*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 3*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 4*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 5*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+7*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+8*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+9*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+10*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-3*16)+11*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: (160-4*16)+0*16+8, y: 200-64,
                obj: 'ground'
            },
            {
                x: (160-4*16)+7*16-8, y: 200-64,
                obj: 'ground'
            }
        ],
        items: []
    },
    // room 53 (fake)
    {
        back: 'rock',
        floor: 'rock',
        details: [],
        items: []
    },
    // room 54
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 136 + 24, y: 96,
                obj: 'debris'
            },
            {
                x: 48, y: 72,
                obj: 'ladder_head'
            }
        ],
        items: []
    },
    // room 55
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: []
    },
    // room 56
    {
        back: 'cave',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right_short'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 0*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 1*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 2*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 3*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 4*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 5*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 6*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 7*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 8*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 9*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 10*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 11*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 12*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 13*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 14*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 15*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 16*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 17*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: 18*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: 19*16, y: 200-64-16,
                obj: 'lava'
            }
        ],
        items: []
    },
    // room 57
    {
        back: 'lava',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left_short'
            }
        ],
        items: []
    },
    // room 58
    {
        back: 'lava',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top_left'
            },
            {
                x: 320-104, y: 0,
                obj: 'cave_top_right'
            },
        ],
        items: []
    },
    // room 59
    {
        back: 'lava',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            }
        ],
        items: []
    },
    // room 60
    {
        back: 'lava',
        floor: 'lava',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top_left'
            },
            {
                x: 320-104, y: 0,
                obj: 'cave_top_right'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right_short'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 0*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 1*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 2*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 3*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 4*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 5*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 6*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 7*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 8*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 9*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 10*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 11*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 12*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 13*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 14*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 15*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 16*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 17*16, y: 200-64-16,
                obj: 'lava_left'
            }
        ],
        items: []
    },
    // room 61
    {
        back: 'cave',
        floor: 'none',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left_short'
            },
            {
                x: 104, y: 56,
                obj: 'green_house'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 0*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: 1*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: 2*16, y: 200-64-16,
                obj: 'lava'
            },
            {
                x: 3*16, y: 200-64-16,
                obj: 'lava_right'
            },
            {
                x: 4*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 5*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 6*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 7*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 8*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 9*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 10*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 11*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 12*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 13*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 14*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 15*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 16*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 17*16, y: 200-64-16,
                obj: 'rock'
            },
            {
                x: 18*16, y: 200-64-16,
                obj: 'rock'
            },

        ],
        items: []
    },
    // room 62
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 0, y: 0,
                obj: 'cave_left'
            },
            {
                x: 104, y: 56,
                obj: 'green_house'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: [
            {
                x: 120 + 16 + 32 + 16, y: 200-64-16-16,
                house: 'green_house',
                visible: true,
                name: 'granate'
            }
        ]
    },
    // room 63
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 48, y: 0,
                obj: 'ladder'
            }
        ],
        items: []
    },
    // room 64
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 136 + 24, y: 96,
                obj: 'debris'
            }
        ],
        items: []
    },
    // room 65
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            }
        ],
        items: []
    },
    // room 66
    {
        back: 'cave',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_top'
            },
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            },
            {
                x: 96, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 256 - 40, y: 72 - 8,
                obj: 'torch'
            },
            {
                x: 48, y: 0,
                obj: 'ladder'
            }
        ],
        items: []
    },
    // room 67 (fake)
    {
        back: 'rock',
        floor: 'rock',
        details: [],
        items: []
    },
    // room 68 (fake)
    {
        back: 'rock',
        floor: 'rock',
        details: [],
        items: []
    },
    // room 69
    {
        back: 'lava',
        floor: 'rock',
        details: [
            {
                x: 0, y: 0,
                obj: 'cave_left'
            }
        ],
        items: []
    },
    // room 70
    {
        back: 'lava',
        floor: 'rock',
        details: [],
        items: []
    },
    // room 71
    {
        back: 'lava',
        floor: 'rock',
        details: [
            {
                x: 320 - 24, y: 0,
                obj: 'cave_right'
            }
        ],
        items: []
    }
];

