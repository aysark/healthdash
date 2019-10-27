import React from 'react';
import _ from 'lodash'
import { Grid, Input, Button, Menu, Image, Dropdown, Divider, Card, Icon, Progress, Label } from 'semantic-ui-react'

import companyLogo from './ucsf-logo.png';

const Terminal = React.createClass({
  getInitialState: function () {
    return {
      productName: 'TEST',
      bol: 'Bill of Lading #7761371507',
      progressLabel: 'Departing',
      progressPercent: 0,
      progressWarning: true,
      progressSuccess: false,
      progressError: false,
      status: 'onvessel'
    };
  },
  render: function () {
    return (
      <div className='App'>
      <Grid>
        <Grid.Column color='black' floated='left' width={2} verticalAlign='top' className='sidebar'>
        <h1>HEALTHDASH</h1>
        <div className="navbar">
          <Image src={companyLogo} size='medium' shape='rounded' fluid />
          <Divider />
          <Button primary fluid>Dashboard</Button>
        </div>
        </Grid.Column>
        <Grid.Column width={14} floated='right' verticalAlign='top'>
          <Menu size='massive' borderless>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>

            <Menu.Menu position='right'>
              <Dropdown as={Menu.Item} text='Jacob the Careteam Coordinator'>
                <Dropdown.Menu>
                  <Dropdown.Item>Account</Dropdown.Item>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
          <br/>
          <Button.Group fluid>
            <Button onClick={this.handleImportsClick} active>Inbound</Button>
            <Button disabled>Outbound</Button>
          </Button.Group>

          <div className="clear"></div>
          <br/><br/>

          <Grid columns={4} divided>
            <Grid.Column>
              <h2>Vessel Docking</h2>
              <Card color='blue'>
                <Card.Content>
                  <Card.Header>Chamber of Secrets</Card.Header>
                  <Card.Meta>IMO 4538234</Card.Meta>
                  <Card.Meta>Sapphire Lines</Card.Meta>
                  <Card.Description>
                    <Progress percent={100} active success>Docked @ Wilmington Terminal</Progress>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  ETA: 7/4/16 <br/>
                  ATA: 7/5/16 <Label color='yellow' horizontal>+ 1 day</Label><br/>
                  <Icon name='cubes' /> 600 Containers <br/>
                  <Icon name='home' /> Hong Kong <br/>
                  <Icon name='marker' /> Los Angeles <br/>
                </Card.Content>
              </Card>
              <Card color='blue'>
                <Card.Content>
                  <Card.Header>Sorcerers Stone</Card.Header>
                  <Card.Meta>IMO 9176187</Card.Meta>
                  <Card.Meta>Sapphire Lines</Card.Meta>
                  <Card.Description>
                    <Progress percent={50} active>Waiting to dock</Progress>
                    <Button basic color='blue' animated='vertical' fluid>
                      <Button.Content visible>60/30/10 - Notify Chassis Op</Button.Content>
                      <Button.Content hidden>
                        <Icon name='call' />
                      </Button.Content>
                    </Button>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  ETA: 7/4/16 <br/>
                  <Icon name='cubes' /> 1300 Containers <br/>
                  <Icon name='square' /> Full Container <br/>
                  <Icon name='home' /> Vung Tau <br/>
                  <Icon name='marker' /> Los Angeles <br/>
                </Card.Content>
              </Card>

            </Grid.Column>
            <Grid.Column>
              <h2>Discharge</h2>
              <Card color='violet'>
                <Card.Content>
                  <Card.Meta><Icon name='circle notched' loading /> BBIU8607266</Card.Meta>
                  <Card.Meta>Required size: 40</Card.Meta>
                  <Card.Meta>Expected Availability: 7/5/16</Card.Meta>
                </Card.Content>
              </Card>
              <Card color='violet'>
                <Card.Content>
                  <Card.Meta><Icon name='circle notched' loading /> BBIU8607267</Card.Meta>
                  <Card.Meta>Required size: 40</Card.Meta>
                  <Card.Meta>Expected Availability: 7/6/16</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <h2>Container To Chassis</h2>
              <Card color='purple'>
                <Card.Content>
                  <Card.Meta>BBIU860725 <Icon name='linkify' /> #4820</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <h2>Freight Station</h2>
              <Card color='violet'>
                <Card.Content>
                  <Card.Meta><Icon name='shipping' /> BBIU8607260</Card.Meta>
                </Card.Content>
              </Card>
              <Card color='violet'>
                <Card.Content>
                  <Card.Meta><Icon name='angle double right' /> BBIU8607259</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      </div>
    );
  },
});

export default Terminal;
