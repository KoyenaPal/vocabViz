import Papa from 'papaparse'

export const load = ({ fetch }) => {
  const fetchFlights = async () => {
    const res = await fetch('https://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.csv', {
      headers: {
        'Content-Type': 'text/csv'
    }})
    let csv_data = await res.text()
    let csv_parsed = Papa.parse(csv_data, {header: true})

    return csv_parsed.data
  }

  return {
    flights: fetchFlights()
  }
}

// export const load = ({ fetch }) => {
//     const fetchFlowers = async () => {
//       const res = await fetch('../../data/example.json')
//       const data = await res.json()
//       return data
//     }
  
//     return {
//       flowers: fetchFlowers()
//     }
//   }