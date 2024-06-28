import { Table } from 'react-bootstrap';

function TopPlayers() {
  return (
    <>
      <h3>Top 100 Guilds</h3>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fates Last Realm (FLR)</td>
            <td>50</td>
            <td>500000</td>
          </tr>
          <tr>
            <td>Shadow Hunters (SH)</td>
            <td>45</td>
            <td>450000</td>
          </tr>
          <tr>
            <td>Dragons Keepers (DK)</td>
            <td>55</td>
            <td>550000</td>
          </tr>
          <tr>
            <td>Warriors of Light (WOL)</td>
            <td>60</td>
            <td>600000</td>
          </tr>
          <tr>
            <td>Mystic Mages (MM)</td>
            <td>40</td>
            <td>400000</td>
          </tr>
          <tr>
            <td>Dark Brotherhood (DB)</td>
            <td>35</td>
            <td>350000</td>
          </tr>
          <tr>
            <td>Guardians of Destiny (GOD)</td>
            <td>70</td>
            <td>700000</td>
          </tr>
          <tr>
            <td>Elven Rangers (ER)</td>
            <td>30</td>
            <td>300000</td>
          </tr>
          <tr>
            <td>Knights of Valor (KOV)</td>
            <td>65</td>
            <td>650000</td>
          </tr>
          <tr>
            <td>Chaos Legion (CL)</td>
            <td>75</td>
            <td>750000</td>
          </tr>
          <tr>
            <td>Silent Assassins (SA)</td>
            <td>25</td>
            <td>250000</td>
          </tr>
          <tr>
            <td>Order of the Phoenix (OOP)</td>
            <td>80</td>
            <td>800000</td>
          </tr>
          <tr>
            <td>Blood Elves (BE)</td>
            <td>20</td>
            <td>200000</td>
          </tr>
          <tr>
            <td>Stonewall Brigade (SB)</td>
            <td>85</td>
            <td>850000</td>
          </tr>
          <tr>
            <td>Frost Wolves (FW)</td>
            <td>90</td>
            <td>900000</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TopPlayers;
