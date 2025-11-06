// src/components/FormationPitch.jsx

import React from 'react';
import { Stage, Layer, Rect, Circle, Text, Line } from 'react-konva';
import { getPositionCoordinates } from '../utils/formationMap';

const ABSTRACT_WIDTH = 120;
const ABSTRACT_HEIGHT = 80;

// Oyuncu pinini oluşturan alt bileşen
const PlayerMarker = ({ player, teamType, onPlayerClick, pitchWidth, pitchHeight, formationName, isActive }) => {
    
    const posName = player.positions[0]?.position;
    
    // Soyut koordinatı sözlükten bul
    let abstractPos = getPositionCoordinates(formationName, posName);

    // Ölçekleme ve aynalama
    let pixelX, pixelY;

    // Y (Dikey) eksenini ölçekle - Y eksenini ters çevir (0,0 sol alt köşe)
    pixelY = ((ABSTRACT_HEIGHT - abstractPos.y) / ABSTRACT_HEIGHT) * pitchHeight;

    if (teamType === 'home') {
        // Ev sahibi (soldan sağa hücum)
        pixelX = (abstractPos.x / ABSTRACT_WIDTH) * pitchWidth;
    } else {
        // Deplasman (sağdan sola hücum) - X eksenini aynala
        pixelX = ((ABSTRACT_WIDTH - abstractPos.x) / ABSTRACT_WIDTH) * pitchWidth;
    }

    return (
        <React.Fragment>
            <Circle
                x={pixelX}
                y={pixelY}
                radius={isActive ? 18 : 14}
                fill={teamType === 'home' ? '#3498db' : '#e74c3c'}
                stroke={isActive ? '#ffd700' : 'white'}
                strokeWidth={isActive ? 3 : 2}
                shadowBlur={isActive ? 8 : 5}
                onClick={() => onPlayerClick(player.player_id, player.player_name)}
                onTap={() => onPlayerClick(player.player_id, player.player_name)}
                style={{ cursor: 'pointer' }}
            />
            <Text
                text={player.jersey_number.toString()}
                x={pixelX - 6}
                y={pixelY - 7}
                fontSize={12}
                fill="white"
                fontStyle="bold"
                listening={false}
            />
        </React.Fragment>
    );
};

// Ana Saha Bileşeni
const FormationPitch = ({ players, teamType, onPlayerClick, formationName, activePlayer }) => {
    
    const containerRef = React.useRef(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        const checkSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                // 3:2 (120:80) oranını koru
                const height = (width / 120) * 80; 
                if (width > 0 && height > 0) {
                    setSize({ width, height });
                }
            }
        };
        
        // İlk render'da boyutu ayarla
        const timer = setTimeout(checkSize, 0);
        
        checkSize();
        window.addEventListener("resize", checkSize);
        return () => {
            window.removeEventListener("resize", checkSize);
            clearTimeout(timer);
        };
    }, []);

    // Canvas boyutu hazır olana kadar placeholder göster
    if (size.width === 0 || size.height === 0) {
        return (
            <div ref={containerRef} className="pitch-container">
                <div style={{ 
                    width: '100%', 
                    paddingBottom: '66.67%', 
                    background: '#1a7d3e',
                    position: 'relative',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: '14px'
                    }}>
                        Saha yükleniyor...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="pitch-container">
            <Stage width={size.width} height={size.height}>
                <Layer>
                    {/* Saha Zemini */}
                    <Rect width={size.width} height={size.height} fill="#1a7d3e" />
                    
                    {/* Orta Çizgi */}
                    <Line
                        points={[size.width / 2, 0, size.width / 2, size.height]}
                        stroke="white" 
                        strokeWidth={2} 
                        opacity={0.6}
                    />
                    
                    {/* Orta Daire */}
                    <Circle
                        x={size.width / 2}
                        y={size.height / 2}
                        radius={size.width * 0.08}
                        stroke="white"
                        strokeWidth={2}
                        opacity={0.6}
                    />
                    
                    {/* Sol Ceza Sahası */}
                    <Rect
                        x={0}
                        y={size.height * 0.225}
                        width={size.width * 0.15}
                        height={size.height * 0.55}
                        stroke="white"
                        strokeWidth={2}
                        opacity={0.6}
                    />
                    
                    {/* Sağ Ceza Sahası */}
                    <Rect
                        x={size.width * 0.85}
                        y={size.height * 0.225}
                        width={size.width * 0.15}
                        height={size.height * 0.55}
                        stroke="white"
                        strokeWidth={2}
                        opacity={0.6}
                    />
                    
                    {/* Oyuncuları çiz */}
                    {players.map(player => (
                        <PlayerMarker 
                            key={player.player_id}
                            player={player} 
                            teamType={teamType}
                            onPlayerClick={onPlayerClick}
                            pitchWidth={size.width}
                            pitchHeight={size.height}
                            formationName={formationName}
                            isActive={activePlayer === player.player_id}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default FormationPitch;