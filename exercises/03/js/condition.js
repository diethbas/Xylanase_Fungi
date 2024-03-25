var Weight = prompt("Enter Weight");
var Height = prompt("Enter Height");

var BMI = parseFloat(Weight) / parseFloat(Height) * parseFloat(Height);

if (BMI <= 16)
{
    console.log("Severly Underweight");
}
else if (BMI >= 16.0 && BMI <= 18.4)
{
    console.log("Underweight");
}
else if (BMI >= 18.5 && BMI <= 24.9)
{
    console.log("Normal Weight");
}
else if (BMI >= 25.0 && BMI <= 29.9)
{
    console.log("Overweight");
}
else if (BMI >= 30.0 && BMI <= 34.9)
{
    console.log("Moderately Obese");
}
else if (BMI >= 35.0 && BMI <= 39.9)
{
    console.log("Severely Obese");
}
else if (BMI >= 40.0)
{
    console.log("Severely Obese");
}