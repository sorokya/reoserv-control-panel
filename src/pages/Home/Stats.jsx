import { Card, CardBody, CardHeader, CardTitle, Table } from 'react-bootstrap';

function Stats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Stats</CardTitle>
      </CardHeader>
      <CardBody>
        <Table>
          <tbody>
            <tr>
              <td>Status</td>
              <td className="text-success">Online</td>
            </tr>
            <tr>
              <td>Accounts</td>
              <td>361</td>
            </tr>
            <tr>
              <td>Characters</td>
              <td>415</td>
            </tr>
            <tr>
              <td>Guilds</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Staff</td>
              <td>3</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default Stats;
