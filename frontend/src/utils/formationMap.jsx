// src/utils/formationMap.js

// 4-4-2 Formasyonu
const map_442 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Back": { x: 30, y: 70 },
    "Right Center Back": { x: 28, y: 55 },
    "Left Center Back": { x: 28, y: 25 },
    "Left Back": { x: 30, y: 10 },
    "Right Midfield": { x: 60, y: 75 },
    "Right Center Midfield": { x: 55, y: 55 },
    "Left Center Midfield": { x: 55, y: 25 },
    "Left Midfield": { x: 60, y: 5 },
    "Right Center Forward": { x: 88, y: 55 },
    "Left Center Forward": { x: 88, y: 25 },
    "Center Forward": { x: 88, y: 40 },
    "Center Defensive Midfield": { x: 45, y: 40 },
    "Center Midfield": { x: 55, y: 40 }
};

// 4-3-3 Formasyonu
const map_433 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Back": { x: 30, y: 75 },
    "Right Center Back": { x: 28, y: 55 },
    "Left Center Back": { x: 28, y: 25 },
    "Left Back": { x: 30, y: 5 },
    "Center Defensive Midfield": { x: 48, y: 40 },
    "Right Center Midfield": { x: 65, y: 60 },
    "Left Center Midfield": { x: 65, y: 20 },
    "Center Midfield": { x: 65, y: 40 },
    "Right Wing": { x: 80, y: 75 },
    "Left Wing": { x: 80, y: 5 },
    "Center Forward": { x: 88, y: 40 },
    "Right Attacking Midfield": { x: 65, y: 60 },
    "Left Attacking Midfield": { x: 65, y: 20 },
    "Secondary Striker": { x: 82, y: 40 }
};

// 4-2-3-1 Formasyonu
const map_4231 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Back": { x: 30, y: 75 },
    "Right Center Back": { x: 28, y: 55 },
    "Left Center Back": { x: 28, y: 25 },
    "Left Back": { x: 30, y: 5 },
    "Right Defensive Midfield": { x: 48, y: 55 },
    "Left Defensive Midfield": { x: 48, y: 25 },
    "Center Defensive Midfield": { x: 48, y: 40 },
    "Right Attacking Midfield": { x: 70, y: 70 }, 
    "Right Wing": { x: 70, y: 70 },
    "Center Attacking Midfield": { x: 70, y: 40 },
    "Left Attacking Midfield": { x: 70, y: 10 }, 
    "Left Wing": { x: 70, y: 10 },
    "Center Forward": { x: 88, y: 40 },
    "Right Midfield": { x: 70, y: 70 },
    "Left Midfield": { x: 70, y: 10 }
};

// 3-5-2 Formasyonu
const map_352 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Center Back": { x: 25, y: 60 },
    "Center Back": { x: 22, y: 40 },
    "Left Center Back": { x: 25, y: 20 },
    "Right Wing Back": { x: 55, y: 78 },
    "Left Wing Back": { x: 55, y: 2 },
    "Right Center Midfield": { x: 50, y: 60 },
    "Center Defensive Midfield": { x: 45, y: 40 },
    "Center Midfield": { x: 50, y: 40 },
    "Left Center Midfield": { x: 50, y: 20 },
    "Right Center Forward": { x: 85, y: 55 },
    "Left Center Forward": { x: 85, y: 25 },
    "Center Forward": { x: 85, y: 40 },
    "Right Midfield": { x: 55, y: 75 },
    "Left Midfield": { x: 55, y: 5 }
};

// 3-4-3 Formasyonu
const map_343 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Center Back": { x: 25, y: 60 },
    "Center Back": { x: 22, y: 40 },
    "Left Center Back": { x: 25, y: 20 },
    "Right Midfield": { x: 55, y: 75 },
    "Right Center Midfield": { x: 50, y: 55 },
    "Center Midfield": { x: 50, y: 40 },
    "Left Center Midfield": { x: 50, y: 25 },
    "Left Midfield": { x: 55, y: 5 },
    "Right Wing": { x: 80, y: 70 },
    "Left Wing": { x: 80, y: 10 },
    "Center Forward": { x: 88, y: 40 },
    "Right Wing Back": { x: 55, y: 78 },
    "Left Wing Back": { x: 55, y: 2 }
};

// 4-1-4-1 Formasyonu
const map_4141 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Back": { x: 30, y: 75 },
    "Right Center Back": { x: 28, y: 55 },
    "Left Center Back": { x: 28, y: 25 },
    "Left Back": { x: 30, y: 5 },
    "Center Defensive Midfield": { x: 45, y: 40 },
    "Right Midfield": { x: 65, y: 75 },
    "Right Center Midfield": { x: 65, y: 55 },
    "Center Midfield": { x: 65, y: 40 },
    "Left Center Midfield": { x: 65, y: 25 },
    "Left Midfield": { x: 65, y: 5 },
    "Center Forward": { x: 88, y: 40 }
};

// 4-1-2-1-2 (Elmas) Formasyonu
const map_41212 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Back": { x: 30, y: 75 },
    "Right Center Back": { x: 28, y: 55 },
    "Left Center Back": { x: 28, y: 25 },
    "Left Back": { x: 30, y: 5 },
    "Center Defensive Midfield": { x: 45, y: 40 },
    "Right Center Midfield": { x: 60, y: 58 },
    "Left Center Midfield": { x: 60, y: 22 },
    "Center Attacking Midfield": { x: 72, y: 40 },
    "Right Center Forward": { x: 88, y: 55 },
    "Left Center Forward": { x: 88, y: 25 },
    "Center Forward": { x: 88, y: 40 }
};

// 5-3-2 Formasyonu
const map_532 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Wing Back": { x: 28, y: 78 },
    "Right Center Back": { x: 25, y: 60 },
    "Center Back": { x: 22, y: 40 },
    "Left Center Back": { x: 25, y: 20 },
    "Left Wing Back": { x: 28, y: 2 },
    "Right Center Midfield": { x: 55, y: 55 },
    "Center Midfield": { x: 55, y: 40 },
    "Left Center Midfield": { x: 55, y: 25 },
    "Right Center Forward": { x: 85, y: 55 },
    "Left Center Forward": { x: 85, y: 25 },
    "Center Forward": { x: 85, y: 40 }
};

// 5-4-1 Formasyonu
const map_541 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Wing Back": { x: 28, y: 78 },
    "Right Center Back": { x: 25, y: 60 },
    "Center Back": { x: 22, y: 40 },
    "Left Center Back": { x: 25, y: 20 },
    "Left Wing Back": { x: 28, y: 2 },
    "Right Midfield": { x: 60, y: 75 },
    "Right Center Midfield": { x: 55, y: 55 },
    "Left Center Midfield": { x: 55, y: 25 },
    "Left Midfield": { x: 60, y: 5 },
    "Center Forward": { x: 88, y: 40 }
};

// 4-5-1 Formasyonu
const map_451 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Back": { x: 30, y: 75 },
    "Right Center Back": { x: 28, y: 55 },
    "Left Center Back": { x: 28, y: 25 },
    "Left Back": { x: 30, y: 5 },
    "Right Midfield": { x: 60, y: 78 },
    "Right Center Midfield": { x: 58, y: 58 },
    "Center Midfield": { x: 55, y: 40 },
    "Left Center Midfield": { x: 58, y: 22 },
    "Left Midfield": { x: 60, y: 2 },
    "Center Forward": { x: 88, y: 40 }
};

// 3-4-1-2 Formasyonu
const map_3412 = {
    "Goalkeeper": { x: 5, y: 40 },
    "Right Center Back": { x: 25, y: 60 },
    "Center Back": { x: 22, y: 40 },
    "Left Center Back": { x: 25, y: 20 },
    "Right Midfield": { x: 50, y: 75 },
    "Right Center Midfield": { x: 50, y: 55 },
    "Left Center Midfield": { x: 50, y: 25 },
    "Left Midfield": { x: 50, y: 5 },
    "Center Attacking Midfield": { x: 70, y: 40 },
    "Right Center Forward": { x: 85, y: 55 },
    "Left Center Forward": { x: 85, y: 25 },
    "Center Forward": { x: 85, y: 40 }
};

// Ana formasyon sözlüğü
const formationMaps = {
    "442": map_442,
    "433": map_433,
    "4141": map_4141,
    "4231": map_4231,
    "41212": map_41212,
    "352": map_352,
    "3412": map_3412,
    "532": map_532,
    "343": map_343,
    "541": map_541,
    "451": map_451,
};

// Varsayılan harita (formasyon bulunamazsa)
export const defaultMap = map_442;

// Varsayılan pozisyon (pozisyon adı haritada bulunamazsa)
export const defaultPosition = { x: 60, y: 40 };

// Ana fonksiyon
export const getPositionCoordinates = (formationName, positionName) => {
    // Formasyon haritasını bul
    const map = formationMaps[formationName] || defaultMap;
    
    // Pozisyonu bul
    const position = map[positionName] || defaultMap[positionName] || defaultPosition; 
    
    return position;
};