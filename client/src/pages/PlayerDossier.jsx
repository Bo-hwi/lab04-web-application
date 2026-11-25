import AppealForm from '../form/AppealForm.jsx'
import { useParams } from 'react-router'

const playerNames = {
  himass: 'Himass',
  tanvuu: 'TanVuu',
}

export default function PlayerDossier() {
  const { playerID } = useParams()
  const playerName = playerNames[playerID]

  if (!playerName) {
    return (
      <main className="page">
        <h1>Not Found</h1>
        <p>Player dossier not found.</p>
      </main>
    )
  }

  return (
    <main className="page">
      <h1>{playerName} Dossier</h1>
      <p>Esports fair-play appeal case dossier.</p>
      <AppealForm playerName={playerName} />
    </main>
  )
}