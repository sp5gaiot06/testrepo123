const UNITS = {
  length: {
    label: "Length",
    // factors are relative to meters
    units: {
      m: { label: "Meters", factor: 1 },
      km: { label: "Kilometers", factor: 1000 },
      cm: { label: "Centimeters", factor: 0.01 },
      mi: { label: "Miles", factor: 1609.344 },
      ft: { label: "Feet", factor: 0.3048 },
      in: { label: "Inches", factor: 0.0254 },
    },
  },
  weight: {
    label: "Weight",
    // factors are relative to kilograms
    units: {
      kg: { label: "Kilograms", factor: 1 },
      g: { label: "Grams", factor: 0.001 },
      lb: { label: "Pounds", factor: 0.45359237 },
      oz: { label: "Ounces", factor: 0.028349523125 },
    },
  },
  temperature: {
    label: "Temperature",
    units: {
      c: { label: "Celsius" },
      f: { label: "Fahrenheit" },
      k: { label: "Kelvin" },
    },
  },
};

const categorySelect = document.getElementById("category");
const fromUnitSelect = document.getElementById("from-unit");
const toUnitSelect = document.getElementById("to-unit");
const fromValueInput = document.getElementById("from-value");
const toValueInput = document.getElementById("to-value");

function populateUnitOptions(category) {
  const units = UNITS[category].units;
  const keys = Object.keys(units);

  [fromUnitSelect, toUnitSelect].forEach((select) => {
    select.innerHTML = "";
    keys.forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = units[key].label;
      select.appendChild(option);
    });
  });

  fromUnitSelect.value = keys[0];
  toUnitSelect.value = keys.length > 1 ? keys[1] : keys[0];
}

function toCelsius(value, unit) {
  if (unit === "c") return value;
  if (unit === "f") return (value - 32) * (5 / 9);
  if (unit === "k") return value - 273.15;
  throw new Error(`Unknown temperature unit: ${unit}`);
}

function fromCelsius(value, unit) {
  if (unit === "c") return value;
  if (unit === "f") return value * (9 / 5) + 32;
  if (unit === "k") return value + 273.15;
  throw new Error(`Unknown temperature unit: ${unit}`);
}

function convert(category, value, fromUnit, toUnit) {
  if (category === "temperature") {
    const celsius = toCelsius(value, fromUnit);
    return fromCelsius(celsius, toUnit);
  }

  const units = UNITS[category].units;
  const baseValue = value * units[fromUnit].factor;
  return baseValue / units[toUnit].factor;
}

function updateConversion() {
  const category = categorySelect.value;
  const fromValue = parseFloat(fromValueInput.value);

  if (Number.isNaN(fromValue)) {
    toValueInput.value = "";
    return;
  }

  const result = convert(category, fromValue, fromUnitSelect.value, toUnitSelect.value);
  toValueInput.value = Math.round(result * 1e6) / 1e6;
}

categorySelect.addEventListener("change", () => {
  populateUnitOptions(categorySelect.value);
  updateConversion();
});

[fromUnitSelect, toUnitSelect, fromValueInput].forEach((el) => {
  el.addEventListener("input", updateConversion);
});

populateUnitOptions(categorySelect.value);
updateConversion();
