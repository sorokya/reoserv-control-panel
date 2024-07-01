import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { Card, CardGroup, Dropdown, ListGroup } from 'react-bootstrap';
import {
  useGetClassList,
  useGetItemList,
  useGetMap,
  useGetNpcList,
} from '../../hooks';
import { upperFirst } from '../../utils/upperFirst';

function MapPage() {
  const { mapId } = useParams();

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

  const {
    isPending: isMapPending,
    isError: isMapError,
    data: map,
  } = useGetMap({ id: mapId });

  const {
    isPending: isItemListPending,
    isError: isItemListError,
    data: itemList,
  } = useGetItemList();

  const {
    isPending: isNpcListPending,
    isError: isNpcListError,
    data: npcList,
  } = useGetNpcList();

  const {
    isPending: isClassListPending,
    isError: isClassListError,
    data: classList,
  } = useGetClassList();

  if (
    isMapPending ||
    isItemListPending ||
    isNpcListPending ||
    isClassListPending
  )
    return 'Loading..';

  if (isMapError || isItemListError || isNpcListError || isClassListError)
    return 'Error..';

  return (
    <>
      <h3>
        #{mapId} - {map.name || 'Unnamed'}
      </h3>

      <CardGroup>
        <Card>
          <Card.Header>
            <Card.Title>Characters</Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {map.characters.map((character) => (
                <ListGroup.Item key={character.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flexGrow: 1 }}>
                      {upperFirst(character.name)}
                      {character.guild ? ` ${character.guild}` : ''}
                      <div>
                        Level {character.level}{' '}
                        {
                          classList.find((c) => c.id === character.class)?.name
                        }{' '}
                      </div>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="dropdown-trigger"
                        variant="default"
                      >
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Details</Dropdown.Item>
                        <Dropdown.Item>History</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>NPCs</Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {map.npcs.map((npc) => (
                <ListGroup.Item key={npc.index}>
                  {npcList.find((n) => n.id === npc.id)?.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Items</Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {map.items.map((item) => (
                <ListGroup.Item key={item.index}>
                  {itemList.find((i) => i.id === item.id)?.name} x{item.amount}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Chest Items</Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {map.chests.flatMap((chest) =>
                chest.items.map((item) => (
                  <ListGroup.Item key={item.index}>
                    {itemList.find((i) => i.id === item.id)?.name} x
                    {item.amount}
                  </ListGroup.Item>
                )),
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}

export default MapPage;
