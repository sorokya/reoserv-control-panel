import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FaEarthAmericas } from 'react-icons/fa6';
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetMapList } from '../hooks';

function Maps() {
  const navigate = useNavigate();
  const {
    isAdmin,
    isAuthenticated,
    pending: authPending,
  } = useContext(AuthContext);
  useEffect(() => {
    if (!authPending && (!isAdmin || !isAuthenticated)) {
      return navigate('/', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate, authPending]);

  const { isPending, isError, data } = useGetMapList();

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
            .filter(
              (map) =>
                map.name.toLowerCase().indexOf(filter.toLowerCase()) > -1,
            )
            .sort((a, b) => {
              if (sort.direction === 'asc') {
                if (typeof a[sort.col] === 'string') {
                  return a[sort.col].localeCompare(b[sort.col]);
                }

                return a[sort.col] - b[sort.col];
              }
              if (typeof a[sort.col] === 'string') {
                return b[sort.col].localeCompare(a[sort.col]);
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
              ID
              {sort.col === 'id' ? SortIcon : ''}
            </th>
            <th
              onClick={() => changeSort('name')}
              style={{ cursor: 'pointer' }}
            >
              Name
              {sort.col === 'name' ? SortIcon : ''}
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
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((map) => (
            <tr key={map.id}>
              <td>{map.id} </td>
              <td>{map.name || '-'}</td>
              <td>{map.players}</td>
              <td>{map.items}</td>
              <td>{map.npcs}</td>
              <td>
                <LinkContainer to={`/maps/${map.id}`}>
                  <Button variant="primary" size="sm">
                    <FaSearch />
                    &nbsp; View
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Maps;
