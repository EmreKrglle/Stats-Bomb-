// src/components/MatchDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import MatchStats from "./MatchStats";
import FormationPitch from "./formationPitch";
import "../css/matchDetail.css";

// StatBox bileşeni (Sidebar için)
function StatBox({ value, label }) {
  const displayValue =
    value === null || typeof value === "undefined" || value === ""
      ? "-"
      : value.toFixed
      ? value.toFixed(2)
      : value;
  const finalDisplayValue = displayValue.toString().endsWith(".00")
    ? displayValue.toString().split(".")[0]
    : displayValue;
  return (
    <div className="stat-box">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{finalDisplayValue}</p>
    </div>
  );
}

// Ana Maç Detayı Bileşeni
function MatchDetail() {
  const { compId, seasonId, matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [lineupData, setLineupData] = useState(null);
  const [matchStatsData, setMatchStatsData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSidebar, setLoadingSidebar] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
  const [showPlayerStats, setShowPlayerStats] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null);
  const [activeKey, setActiveKey] = useState("home");

  useEffect(() => {
    const fetchAllMatchData = async () => {
      setLoading(true);
      setError(null);
      setPlayerStats(null);
      setActivePlayer(null);
      setShowPlayerStats(false);

      try {
        const matchDetailUrl = `https://localhost:7148/api/Matches/${compId}/${seasonId}/${matchId}`;
        const lineupUrl = `https://localhost:7148/api/LineUp/${matchId}`;
        const matchStatsUrl = `https://localhost:7148/api/MatchStats/${matchId}`;

        const [matchDetailResponse, lineupResponse, matchStatsResponse] =
          await Promise.all([
            fetch(matchDetailUrl),
            fetch(lineupUrl),
            fetch(matchStatsUrl),
          ]);

        if (!matchDetailResponse.ok)
          throw new Error(
            `Maç detayları alınamadı (HTTP ${matchDetailResponse.status})`
          );
        if (!lineupResponse.ok)
          throw new Error(
            `Kadro bilgisi alınamadı (HTTP ${lineupResponse.status})`
          );
        if (!matchStatsResponse.ok)
          throw new Error(
            `Maç istatistikleri alınamadı (HTTP ${matchStatsResponse.status})`
          );

        const matchStatsResult = await matchStatsResponse.json();
        setMatchData(await matchDetailResponse.json());
        setLineupData(await lineupResponse.json());
        setMatchStatsData(
          Array.isArray(matchStatsResult)
            ? matchStatsResult[0]
            : matchStatsResult || null
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMatchData();
  }, [compId, seasonId, matchId]);

  const loadPlayerStats = async (playerId, playerName) => {
    setLoadingSidebar(true);
    setSelectedPlayerName(playerName);
    setPlayerStats(null);
    setShowPlayerStats(true);
    setActivePlayer(playerId);

    try {
      const playerStatsUrl = `https://localhost:7148/api/PlayerStats/${matchId}/${playerId}`;
      const response = await fetch(playerStatsUrl);

      if (response.status === 404) {
        throw new Error("Bu oyuncu için hesaplanmış istatistik bulunamadı.");
      }
      if (!response.ok) {
        throw new Error(`Veri çekilemedi (Hata: ${response.status})`);
      }

      let stats = await response.json();
      stats =Array.isArray(stats) ? stats[0] : stats;
      setPlayerStats(Array.isArray(stats) ? stats[0] : stats);
      console.log(playerStats)
    } catch (err) {
      console.error("İstatistik yükleme hatası:", err);
      setPlayerStats({ error: err.message });
    } finally {
      setLoadingSidebar(false);
    }
  };

  const renderSidebarContent = () => {
    if (!showPlayerStats) return null;

    if (loadingSidebar) {
      return (
        <>
          <button
            className="close-sidebar-btn"
            onClick={() => setShowPlayerStats(false)}
          >
            ✕
          </button>
          <div className="stats-title">⚽ Oyuncu İstatistikleri</div>
          <div className="stats-player-name">{selectedPlayerName}</div>
          <div className="stats-placeholder">
            <div className="spinner"></div>
            <p>İstatistikler yükleniyor...</p>
          </div>
        </>
      );
    }

    if (!playerStats) {
      return null;
    }

    if (playerStats.error) {
      return (
        <>
          <button
            className="close-sidebar-btn"
            onClick={() => setShowPlayerStats(false)}
          >
            ✕
          </button>
          <div className="stats-title">⚽ Oyuncu İstatistikleri</div>
          <div className="stats-player-name">{selectedPlayerName}</div>
          <div
            className="stats-placeholder"
            style={{ display: "block", color: "#c0392b" }}
          >
            İstatistik yüklenemedi
            <br />
            <small>{playerStats.error}</small>
          </div>
        </>
      );
    }

    const stats = playerStats;
    const shotStats = stats.shot || {};
    const passStats = stats.pass || {};
    const defenseStats = stats.defense || {};
    const possessionStats = stats.possession || {};

    return (
      <>
        <button
          className="close-sidebar-btn"
          onClick={() => setShowPlayerStats(false)}
        >
          ✕
        </button>
        <div className="stats-title">⚽ Oyuncu İstatistikleri</div>
        <div className="stats-player-name">{selectedPlayerName}</div>

        <div className="stats-section">
          <div className="section-header">🎯 Şut İstatistikleri</div>
          <StatBox value={shotStats.total} label="Toplam Şut" />
          <StatBox value={shotStats.on_target} label="İsabetli Şut" />
          <StatBox value={shotStats.goals} label="Gol" />
          <StatBox value={shotStats.xg} label="Beklenen Gol (xG)" />
        </div>

        <div className="stats-section">
          <div className="section-header">⚡ Pas İstatistikleri</div>
          <StatBox value={passStats.total} label="Toplam Pas" />
          <StatBox value={passStats.completed} label="Başarılı Pas" />
          <StatBox value={passStats.completion_rate} label="Pas Başarı %" />
          <StatBox value={passStats.key_passes} label="Kilit Pas" />
          <StatBox value={passStats.assists} label="Asist" />
        </div>

        <div className="stats-section">
          <div className="section-header">🛡️ Savunma İstatistikleri</div>
          <StatBox value={defenseStats.tackles} label="Müdahale" />
          <StatBox value={defenseStats.interceptions} label="Top Kesme" />
          <StatBox value={defenseStats.clearances} label="Uzaklaştırma" />
          <StatBox value={defenseStats.blocks} label="Blok" />
        </div>

        <div className="stats-section">
          <div className="section-header">⚽ Hücum & Diğer</div>
          <StatBox value={possessionStats.dribbles} label="Dribling" />
          <StatBox value={possessionStats.touches} label="Topa Dokunma" />
          <StatBox value={stats.fouls_committed} label="Faul Yaptı" />
          <StatBox value={stats.fouls_won} label="Faul Kazandı" />
        </div>
      </>
    );
  };

  const renderLineupList = (lineup) => {
    if (!lineup || !lineup.lineup) return [];

    const subs = [];
    lineup.lineup.forEach((player) => {
      if (!player.positions || player.positions.length === 0) return;

      if (player.positions[0].start_reason !== "Starting XI") {
        const playerItem = (
          <li
            className={`player-item ${
              activePlayer === player.player_id ? "active" : ""
            }`}
            key={player.player_id}
            id={`player-li-${player.player_id}`}
            onClick={() =>
              loadPlayerStats(player.player_id, player.player_name)
            }
          >
            <div className="player-link">
              <span className="player-number">{player.jersey_number}</span>
              <span className="player-name">{player.player_name}</span>
              {player.positions[0].start_reason === "Substitution" && (
                <span className="player-time">{player.positions[0].from}'</span>
              )}
            </div>
          </li>
        );
        subs.push(playerItem);
      }
    });
    return subs;
  };

  const getStarting11 = (lineup) => {
    if (!lineup || !lineup.lineup) return [];
    return lineup.lineup.filter(
      (player) =>
        player.positions &&
        player.positions.length > 0 &&
        player.positions[0].start_reason === "Starting XI"
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Maç detayları yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-card">
        ❌ Veriler yüklenirken bir hata oluştu: {error}
      </div>
    );
  }

  if (!matchData || !lineupData) {
    return (
      <div
        className="error-card"
        style={{ background: "var(--secondary-color)" }}
      >
        <h3>Veri Bulunamadı</h3>
        <p>Maç detayları veya kadro bilgisi yüklenemedi.</p>
      </div>
    );
  }

  const homeLineup = lineupData.find(
    (team) => team.team_name === matchData.home_team.home_team_name
  );
  const homeLineupFormation = lineupData.find(
    (team) => team.team_name === matchData.home_team.home_team_name
  )?.lineup_name;

  const awayLineup = lineupData.find(
    (team) => team.team_name === matchData.away_team.away_team_name
  );
  const awayLineupFormation = lineupData.find(
    (team) => team.team_name === matchData.away_team.away_team_name
  )?.lineup_name;

  const homeStarters = getStarting11(homeLineup);
  const homeSubs = renderLineupList(homeLineup);
  const awayStarters = getStarting11(awayLineup);
  const awaySubs = renderLineupList(awayLineup);

  return (
    <>
      <RouterLink to="/" className="back-btn mb-4">
        ← Maç Listesine Geri Dön
      </RouterLink>

      <div id="matchContent">
        <div className="score-card">
          <div className="score-section">
            <div className="team-info">
              <div className="team-name">
                {matchData.home_team.home_team_name}
              </div>
            </div>
            <div className="score-display">
              <div className="score">
                {matchData.home_score} - {matchData.away_score}
              </div>
            </div>
            <div className="team-info">
              <div className="team-name">
                {matchData.away_team.away_team_name}
              </div>
            </div>
          </div>
        </div>

        <div className="matchContent">
          <div className="main-content">
            <div className="lineup-section">
              <Tab.Container
                id="team-tabs"
                activeKey={activeKey}
                onSelect={(k) => setActiveKey(k)}
                defaultActiveKey="home"
              >
                <Nav variant="tabs" className="nav-tabs-custom">
                  <Nav.Item>
                    <Nav.Link eventKey="home" className="team-tab-link">
                      {matchData.home_team.home_team_name}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="away" className="team-tab-link">
                      {matchData.away_team.away_team_name}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content className="tab-content-custom">
                  <Tab.Pane eventKey="home" mountOnEnter unmountOnExit>
                    <div className="lineup-card">
                      <div className="manager-info">
                        <p className="manager-name">
                          {matchData.home_team.managers[0]?.nickname ||
                            matchData.home_team.managers[0]?.name}
                        </p>
                      </div>
                      <h5 className="section-title">İlk 11</h5>

                      <FormationPitch
                        players={homeStarters}
                        teamType="home"
                        onPlayerClick={loadPlayerStats}
                        formationName={homeLineupFormation}
                        activePlayer={activePlayer}
                      />

                      <h5 className="section-title">Yedekler</h5>
                      <ul className="player-list">{homeSubs}</ul>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="away" mountOnEnter unmountOnExit>
                    <div className="lineup-card">
                      <div className="manager-info">
                        <p className="manager-name">
                          {matchData.away_team.managers[0]?.nickname ||
                            matchData.away_team.managers[0]?.name}
                        </p>
                      </div>
                      <h5 className="section-title">İlk 11</h5>

                      <FormationPitch
                        players={awayStarters}
                        teamType="away"
                        onPlayerClick={loadPlayerStats}
                        formationName={awayLineupFormation}
                        activePlayer={activePlayer}
                      />

                      <h5 className="section-title">Yedekler</h5>
                      <ul className="player-list">{awaySubs}</ul>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>

            <div className="match-stats-wrapper">
              <MatchStats
                matchStatsData={matchStatsData}
                homeTeamName={matchData.home_team.home_team_name}
                awayTeamName={matchData.away_team.away_team_name}
              />
            </div>
          </div>

          <div className="dev-section">
            <h4 className="dev-title">🔧 Geliştirici Bilgisi (Ham Veri)</h4>
            <pre className="raw-data">
              {JSON.stringify(
                { matchData, lineupData, matchStatsData, playerStats },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        {showPlayerStats && (
          <div className="stats-sidebar">{renderSidebarContent()}</div>
        )}
      </div>
    </>
  );
}

export default MatchDetail;
