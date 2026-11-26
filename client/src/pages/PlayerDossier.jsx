import AppealForm from '../form/AppealForm.jsx'
import AppealSlaCountdown from '../components/AppealSlaCountdown.jsx'
import DisproportionalityMatrix from '../components/DisproportionalityMatrix.jsx'
import { useParams } from 'react-router'

const playerNames = {
  himass: 'Himass',
  tanvuu: 'TanVuu',
}

export default function PlayerDossier() {
  const { playerID } = useParams()
  const playerName = Object.hasOwn(playerNames, playerID) ? playerNames[playerID] : null

  if (!playerName) {
    return (
      <section className="page" aria-label="Dossier not found">
        <h1>Not Found</h1>
        <p>Player dossier not found.</p>
      </section>
    )
  }

  return (
    <section className="page" aria-label={`${playerName} case dossier`}>
      <h1>{playerName} Dossier</h1>
      <p>Esports fair-play appeal case dossier.</p>
      <AppealSlaCountdown />
      <DisproportionalityMatrix />
      <AppealForm key={playerID} playerName={playerName} />
    </section>
  )
}
