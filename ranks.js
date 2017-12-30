'use strict';

const ranks = {
    0: "Unranked",
    1: "S1",
    2: "S2",
    3: "S3",
    4: "S44",
    5: "SE",
    6: "SEM",
    7: "GN1",
    8: "GN2",
    9: "GN3",
    10: "GNM",
    11: "MG1",
    12: "MG2",
    13: "MGE",
    14: "DMG",
    15: "LE",
    16: "LEM",
    17: "SMFC",
    18: "GE"
}

class Rank {
    static getString(intRank) {
        return ranks[intRank];
    }
}

exports.Rank = Rank;

const levels =
{
    0: 'Not Recruited',
    1: 'Recruit',
    2: 'Private',
    3: 'Private',
    4: 'Private',
    5: 'Corporal',
    6: 'Corporal',
    7: 'Corporal',
    8: 'Corporal',
    9: 'Sergeant',
    10: 'Sergeant',
    11: 'Sergeant',
    12: 'Sergeant',
    13: 'Master Sergeant',
    14: 'Master Sergeant',
    15: 'Master Sergeant',
    16: 'Master Sergeant',
    17: 'Sergeant Major',
    18: 'Sergeant Major',
    19: 'Sergeant Major',
    20: 'Sergeant Major',
    21: 'Lieutenant',
    22: 'Lieutenant',
    23: 'Lieutenant',
    24: 'Lieutenant',
    25: 'Captain',
    26: 'Captain',
    27: 'Captain',
    28: 'Captain',
    29: 'Major',
    30: 'Major',
    31: 'Major',
    32: 'Major',
    33: 'Colonel',
    34: 'Colonel',
    35: 'Colonel',
    36: 'Brigadier General',
    37: 'Major General',
    38: 'Lieutenant General',
    39: 'General',
    40: 'Global General'
};

class Level {
    static getString(intLevel) {
        return levels[intLevel];
    }
}

exports.Level = Level;