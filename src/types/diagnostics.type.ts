export type Diagnostics1 = {

    "overall": {
        "rack_grade": string,
        "rack_lifespan": number,
        "rack_capacity": number,
        "rack_efficiency": number,
        "rack_capacity_blance": number,
        "soc_balance": number,
        "resistance_balance": number
    };
    "batt_overall": {
        "batt_total_grade": string,
        "batt_lifespan": number,
        "batt_efficiency": number,
        "power_usage": number,
        "proper_soc_usage": number,
        "avalable_batt_capacity": number,
        "aging": number,
        "capacity_deviation": number,
        "rest_deviation": number,
        "resistance": number
    },
    "rack_various_capacity": {
        "rack_capacity": number,
        "cell_avg_capacity": number,
        "safe_capacity": number,
        "available_capacity": number
    },
    "cell_capacity": {
        "avg_c_cr": number,
        "cell_max_capacity": {
            "max_c_cr": number,
            "max_cr_idx": number
        },
        "cell_min_capacity": {
            "min_c_cr": number,
            "min_cr_idx": number
        }
    },
    "cell_capacity_distribution": {
        "cell_capacity": [number]
    },
    "cell_capacity_data": {
        "cell_average": number,
        "cell_max": {
            "max_c_cr": number,
            "max_cr_idx": number
        },
        "cell_min": {
            "min_c_cr": number,
            "min_cr_idx": number
        },
        "cell_avg_deviation": number,
        "cell_max_deviation": number
    },
    "cell_capacity_change_trend": {
        "timestamp": string[],
        "trend_max": {
            "max_c_cr": number,
            "max_cr_idx": number
        }[],
        "trend_min": {
            "min_c_cr": number,
            "min_cr_idx": number
        }[],
        "trend_avg": number[]
    },
    "cell_rest_balance": {
        "100_zone_left": number,
        "100_zone_right": {
            "dsoc": number,
            "max_cac_idx": number
        },
        "0_zone_left": number,
        "0_zone_right": {
            "dsoc": number,
            "min_fac_idx": number
        }
    },
    "allrange_rest_balance": {
        "timestamp": string[],
        "max_soc": number[]
    },
    "rack_resistance": {
        "rack_resistance": number,
        "cell_resistance": number,
        "hw_resistance": number
    },
    "cell_resistance_statistics": {
        "resistance_max": {
            "max_cell": number,
            "max_cell_idx": number
        },
        "resistance_min": {
            "min_cell": number,
            "min_cell_idx": number
        },
        "resistance_avg": number
    },
    "cell_resitance_histogram": {
        "histogram": number
    },
    "cell_resistance": {
        "cell_avg_resistance": number,
        "cell_max_resistance": {
            "max_cell": number,
            "max_cell_idx": number
        },
        "cell_min_resistance": {
            "min_cell": number,
            "min_cell_idx": number
        },
        "cell_avg_resistance_diviation": number,
        "cell_max_resistance_diviation": number
    },
    "cell_resistance_change_trend": {
        "timestamp": string[],
        "max": {
            "max_cell": number,
            "max_cell_idx": number
        }[],
        "min": {
            "min_cell": number,
            "min_cell_idx": number
        }[],
        "avg": number[]
    },
    "rack_available_capacity_per_temp": {
        "temper": string[],
        "pack": number[]
    },
    "rack_resistance_per_temp": {
        "temper": string[],
        "pack": number[]
    },
    "whole_cell_details": {
        "cell": number[],
        "c_cr": number[]
    }

};

export type Diagnostics2 = {
    "date": string,
    "power_control": {
        "exceeded_count": number,
        "first_data": number,
        "max": number,
        "min": number,
        "last_data": number,
    },
    "power_control_signal": number,
    "power_pattern": {
        "system_chg": number,
        "system_dchg": number,
        "rack_data": {
            "RACK_NUMBER": {
                "chg": number,
                "dchg": number,
            }
        }[]
    },
    "power_pattern_signal": number
};
