import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FaEarthAmericas } from 'react-icons/fa6';
import { Col, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Maps() {
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (!isAdmin || !isAuthenticated) {
      return navigate('/', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const { isPending, isError, data } = useQuery({
    queryKey: ['maps'],
    retry: false,
    queryFn: async () => {
      const response = await axios.get('/api/maps/list', {
        withCredentials: true,
      });

      return response.data;
    },
  });

  const [sort, setSort] = useState({ col: 'id', direction: 'asc' });
  const [filter, setFilter] = useState('');

  const changeSort = (col) => {
    if (col === sort.col) {
      setSort({ col, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ col, direction: 'asc' });
    }
  };

  const SortIcon = useMemo(
    () => (sort.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />),
    [sort],
  );

  const sortedData = useMemo(
    () =>
      data
        ? [...data]
            .filter((map) => map.name.toLowerCase().indexOf(filter) > -1)
            .sort((a, b) => {
              if (sort.direction === 'asc') {
                return a[sort.col] - b[sort.col];
              }
              return b[sort.col] - a[sort.col];
            })
        : undefined,
    [sort, data, filter],
  );

  if (isPending) return 'Loading...';

  if (isError) return 'Error...';

  return (
    <>
      <h3>
        <FaEarthAmericas />
        &nbsp;Maps
      </h3>
      <Row>
        <Col md={3}>
          <InputGroup>
            <InputGroupText>
              <FaSearch />
            </InputGroupText>
            <FormControl
              type="text"
              placeholder="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <br />
      <Table>
        <thead>
          <tr>
            <th onClick={() => changeSort('id')} style={{ cursor: 'pointer' }}>
              Map
              {sort.col === 'id' ? SortIcon : ''}
            </th>
            <th
              onClick={() => changeSort('players')}
              style={{ cursor: 'pointer' }}
            >
              Players
              {sort.col === 'players' ? SortIcon : ''}
            </th>
            <th
              onClick={() => changeSort('items')}
              style={{ cursor: 'pointer' }}
            >
              Items
              {sort.col === 'items' ? SortIcon : ''}
            </th>
            <th
              onClick={() => changeSort('npcs')}
              style={{ cursor: 'pointer' }}
            >
              NPCs
              {sort.col === 'npcs' ? SortIcon : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((map) => (
            <tr key={map.id}>
              <td>
                {map.id} - {map.name || 'Unnamed'}
              </td>
              <td>{map.players}</td>
              <td>{map.items}</td>
              <td>{map.npcs}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Maps;
