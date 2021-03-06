
// List of column names
var eimColumns = [
    "Study_ID",
    "Location_ID",
    "Study_Specific_Location_ID",
    "Field_Collection_Type",
    "Field_Collector",
    "Field_Collection_Start_Date",
    "Field_Collection_Start_Time",
    "Field_Collection_End_Date",
    "Field_Collection_End_Time",
    "Field_Collection_Comment",
    "Field_Collection_Area",
    "Field_Collection_Area_Units",
    "Field_Collection_Reference_Point",
    "Field_Collection_Upper_Depth",
    "Field_Collection_Lower_Depth",
    "Field_Collection_Depth_Units",
    "Well_Water_Level_Measuring_Point_or_TOC_ID",
    "Sample_ID",
    "Sample_Field_Replicate_ID",
    "Sample_Replicate_Flag",
    "Sample_Sub_ID",
    "Sample_Composite_Flag",
    "Storm_Event_Qualifier",
    "Sample_Matrix",
    "Sample_Source",
    "Sample_Use",
    "Sample_Collection_Method",
    "Sample_Preparation_Method",
    "Sample_Method_Other",
    "Sample_Taxon_Name",
    "Sample_Taxon_TSN",
    "Sample_Tissue_Type",
    "Sample_Percent_Sorted",
    "Result_Parameter_Name",
    "Result_Parameter_CAS_Number",
    "Lab_Analysis_Date",
    "Lab_Analysis_Date_Accuracy",
    "Lab_Analysis_Time",
    "Result_Value",
    "Result_Value_Units",
    "Result_Reporting_Limit",
    "Result_Reporting_Limit_Type",
    "Result_Detection_Limit",
    "Result_Detection_Limit_Type",
    "Result_Data_Qualifier",
    "Fraction_Analyzed",
    "Field_Filtered_Flag",
    "Result_Basis",
    "Digestion_Method",
    "Water_Level_Accuracy",
    "Result_Method",
    "Result_Comment",
    "Result_Additional_Comment",
    "Result_Lab_Replicate_ID",
    "Result_Lab_Name",
    "Result_Validation_Level",
    "Result_Taxon_Name",
    "Result_Taxon_TSN",
    "Result_Taxon_Unidentified_Species",
    "Result_Taxon_Life_Stage"
];

// List of columns that must, in combination, be unique for all rows
var uniqueColumns = [
    "Study_ID",
    "Location_ID",
    "Study_Specific_Location_ID",
    "Field_Collection_Type",
    "Field_Collection_Start_Date",
    "Field_Collection_Start_Time",
    "Field_Collection_Upper_Depth",
    "Field_Collection_Lower_Depth",
    "Field_Collection_Depth_Units",
    "Sample_Field_Replicate_ID",
    "Sample_Replicate_Flag",
    "Sample_Matrix",
    "Sample_Source",
    "Result_Parameter_Name",
    "Fraction_Analyzed"
];

function dateFromUSFormatString(str) {
    var parsedDate = str
        .replace(/'/g, '')
        .replace(/"/g, '')
        .split("/");
    
    var d = new Date(
        parsedDate[2].slice(0, 4),
        parsedDate[0],
        parsedDate[1]
    );
    
    return d;
}

function validDateFormat(date) {
    
    var dateIsValid = false;
    
    try {
        dateIsValid = !isNaN(dateFromUSFormatString(date).getDate());
    } catch(err) {
        dateIsValid = false;
    };
    
    if (typeof dateIsValid === "undefined") {
        dateIsValid = false;
    };
    
    return dateIsValid;
};

function validTimeFormat(time) {
    
    var timeIsValid = false;
    
    try {
        var parsedTime = time
            .replace(/'/g, '')
            .replace(/"/g, '')
            .split(":");
        timeIsValid = (
            (parsedTime[0] < 24 & parsedTime[0] >= 0) &
            (parsedTime[1] <= 59 & parsedTime[1] >= 0) &
            (parsedTime[2] <= 59 & parsedTime[2] >= 0)
        );
        
    
    } catch(err) {
        timeIsValid = false;
    };
    
    if (typeof timeIsValid === "undefined") {
        timeIsValid = false;
    };
    
    return timeIsValid;
};


// Returns an error description. If the string is empty,
//  no errors.
// Designed for validating a single field.
function eimValidValue(field, value) {
    var err = "";
    
    if (field == "Study_ID") {
    
        if (value.length < 1) {
            err = "Missing Study ID";
        }
        
        if (value.length > 20) {
            err = "Study ID greater than 20 characters";
        }
        
    } else if (field == "Location_ID") {
    
        if (value.length < 1) {
            err = "Missing Location ID";
        }
        
        if (value.length > 15) {
            err = "Location ID greater than 15 characters";
        }
        
    } else if (field == "Study_Specific_Location_ID") {
    
        if (value.length < 1) {
            err = "Missing Study-Specific Location ID";
        }
        
        if (value.length > 40) {
            err = "Location ID greater than 40 characters";
        }
        
    } else if (field == "Field_Collection_Type") {
    
        if (value.length < 1) {
            err = "Missing Field Collection Type";
        }
        
        if (["sample", "measurement", "observation"].indexOf(value.toLowerCase()) < 0 ) {
            err = "'" + value + "' is not a valid Field Collection Type (sample, measurement, or observation)";
        }
        
    } else if (field == "Field_Collector") {
        var validValues = [
            "Business",
            "ConsDistrict",
            "Consultant",
            "Ecology",
            "GovFed",
            "GovLocal",
            "GovState",
            "GovTribal",
            "HealthLocal",
            "HealthState",
            "NGO",
            "NOAA",
            "UNIVERSITY",
            "USACE",
            "USEPA",
            "USGS",
            "USNPS",
            "UtilityPrivate",
            "UtilityPublic",
            "Volunteer",
            "WDFW",
            "WDNR",
            "WellDriller",
            "WellOwner",
        ];
        
        if (value.length < 1) {
            err = "Missing Field Collector";
        
        } else if (value.length > 15) {
            err = "Field Collector greater than 15 characters";
        
        } else if (validValues.indexOf(value) < 0) {
            err = "'" + value + "' is not a valid value for Field Collector";
        };
    
    } else if (field == "Field_Collection_Start_Date") {
    
        if (value.length < 1) {
            err = "Missing Field Collection Start Date";
        } else {
            var dateIsValid = validDateFormat(value);
            
            if (!dateIsValid) {
                err = "'" + value + "' is not a valid format for Field Collection Start Date; must be MM/DD/YYYY.";
            };
            
        };
    
    } else if ((field == "Field_Collection_Start_Time") & (value.length >= 1)) {
        
        var timeIsValid = validTimeFormat(value);
        
        if (!timeIsValid) {
            err = "'" + value + "' is not a valid format for Field Collection Start Time; must be HH:MM:SS.";
        };
    
    } else if ((field == "Field_Collection_End_Date") & (value.length >= 1)) {
        
        var dateIsValid = validDateFormat(value);
        
        if (!dateIsValid) {
            err = "'" + value + "' is not a valid format for Field Collection End Date; must be MM/DD/YYYY.";
        };
    
    } else if ((field == "Field_Collection_End_Time") & (value.length >= 1)) {
        
        var timeIsValid = validTimeFormat(value);
        
        if (!timeIsValid) {
            err = "'" + value + "' is not a valid format for Field Collection End Time; must be HH:MM:SS.";
        };
    
    }  else if ((field == "Field_Collection_Comment") & (value.length >= 1)) {
    
        if (value.length > 2000) {
            err = "Field Collection Comment is too long; must be under 2,000 characters.";
        };
    
    } else if ((field == "Field_Collection_Area") & (value.length >= 1)) {
    
        if (isNaN(parseFloat(value))) {
            err = "Field Collection Area must be a number.";
        };
    
    } else if ((field == "Field_Collection_Area_Units") & (value.length >= 1)) {
    
        if (["cm2", "m2", "ft2"].indexOf(value) < 0) {
            err = "'" + value + "' is not a valid value for Field Collection Area Units; must be 'cm2', 'm2', or 'ft2'.";
        };
    
    } else if ((field == "Field_Collection_Reference_Point") & (value.length >= 1)) {
    
        var validValues = [
            "Land Surface",
            "Water Surface",
            "Sediment Surface",
            "Floor of Structure"
        ];
    
        if (validValues.indexOf(value) < 0) {
            err = "'" + value + "' is not a valid value for Field Collection Reference Point.";
        };
    
    } else if ((field == "Field_Collection_Upper_Depth") & (value.length >= 1)) {
    
        if (isNaN(parseFloat(value))) {
            err = "Field Collection Upper Depth must be a number.";
        };
    
    } else if ((field == "Field_Collection_Lower_Depth") & (value.length >= 1)) {
    
        if (isNaN(parseFloat(value))) {
            err = "Field Collection Lower Depth must be a number.";
        };
    
    } else if ((field == "Field_Collection_Depth_Units") & (value.length >= 1)) {
    
        if (["cm", "m", "ft", "in"].indexOf(value) < 0) {
            err = "'" + value + "' is not a valid value for Field Collection Depth Units; must be 'cm', 'm', 'ft', or 'in'.";
        };
    
    } else if ((field == "Well_Water_Level_Measuring_Point_or_TOC_ID") & (value.length >= 1)) {
    
        if (["TOC1", "MP1"].indexOf(value) < 0) {
            err = "'" + value + "' is not a valid value for Well Water Level Measuring Point or TOC ID; must be 'TOC1' or 'MP1'.";
        };
    
    } else if ((field == "Sample_ID") & (value.length >= 1)) {
    
        if (value.length > 50) {
            err = "The Sample ID is too long.";
        };
    
    } 
    
    return(err);
}

// Accepts an EIM row as an object,{field1: value, field2: value},
//  and runs data checks against multiple values at once.  For instance,
//  if the row is a measurement, are all the measurement-specific fields
//  filled in?
function eimRowValidate(row) {
    var errs = [];
    
    if (row.Field_Collection_Type == "Sample") {
        if (row.Sample_ID.length < 1) {
            errs.push(["Sample_ID", "Field_Collection_Type is Sample, but Sample_ID field is empty."]);
        };
    };
    
    if (!(typeof row.Result_Parameter_Name === "undefined")) {
        if ("water level in well".indexOf(row.Result_Parameter_Name.toLowerCase().slice(0,19)) >= 0) {
        
            if (row.Well_Water_Level_Measuring_Point_or_TOC_ID.length < 1) {
                errs.push(["Well_Water_Level_Measuring_Point_or_TOC_ID", "The parameter is well water level, but the measuring point/TOC field is empty"]);
            };
        };
    };
    
    if (!!row.Field_Collection_End_Date & !!row.Field_Collection_Start_Date) {
        var d1 = dateFromUSFormatString(row.Field_Collection_Start_Date);
        var d2 = dateFromUSFormatString(row.Field_Collection_End_Date);
        
        if (d1 > d2) {
            errs.push(["Field_Collection_End_Date", "End date of field collection is before start date"])
        };
    };
    
    if (!!row.Result_Reporting_Limit & !!row.Result_Value) {
        if ((+row.Result_Reporting_Limit > +row.Result_Value) & (!row.Result_Data_Qualifier)) {
            errs.push(["Result_Data_Qualifier","The result value is greater than the reporting limit, but there is no data qualifier present"])
        };
    };

    if ((row.Field_Collection_Type == "Sample") || (row.Field_Collection_Type == "Measurement")) {
        if (!row.Result_Value) {
            errs.push(["Result_Value","Result value is missing; it is required for samples and measurements."]);
        };
    };

    if ((row.Field_Collection_Type == "Sample") || (row.Field_Collection_Type == "Measurement")) {
        if (!row.Result_Value_Units) {
            errs.push(["Result_Value_Units","Result value units are missing; they required for samples and measurements."]);
        };
    };
    
    if ((row.Field_Collection_Type == "Sample") & (row.Sample_Matrix == "Water")) {
        if (!row.Fraction_Analyzed) {
            errs.push(["Fraction_Analyzed","Fraction analyzed is required for water samples."]);
        };
    };
    
    return(errs);
};
