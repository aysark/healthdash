import React from 'react';
// import ReactDOM from 'react-dom';
import _ from 'lodash'
import { Grid, Input, Button, Menu, Image, Dropdown, Divider, Card, Icon, Progress, Header, Modal, Feed, Label, Segment, Statistic, Loader } from 'semantic-ui-react'
import Client from './Client';
import NextEncounterPrediction from './NextEncounterPrediction';
import {Line, Radar} from 'react-chartjs-2';

import companyLogo from './ucsf-logo2.png';

const AnalyticsStats = () => (
  
  <Statistic.Group>
    <Statistic color='yellow'>
      <Statistic.Value>20% <Icon name='repeat' /></Statistic.Value>
      <Statistic.Label>Re-admission Risk</Statistic.Label>
    </Statistic>
    <Statistic color='red'>
      <Statistic.Value>4</Statistic.Value>
      <Statistic.Label>Admits YTD</Statistic.Label>
    </Statistic>

    <Statistic color='grey'>
      <Statistic.Value text>
        4.5 days
      </Statistic.Value>
      <Statistic.Label>Avg Length of Stay</Statistic.Label>
    </Statistic>

    <Statistic color='green'>
      <Statistic.Value>
        <Icon name='checkmark' />
      </Statistic.Value>
      <Statistic.Label>Discharge Orders</Statistic.Label>
    </Statistic>
  </Statistic.Group>
)

const App = React.createClass({
  getInitialState: function () {
    return {
      patientName: 'Betty White',
      dob: 'F, DOB 01/17/1922',
      location: 'UCSF Medical Center',
      attending: 'Dr V. Kenyon',
      pcp: 'Dr P. Abramson',
      etd: '10/30/19 (4 days)',
      progressLabel: 'Arrived',
      progressPercent: 0,
      progressWarning: true,
      progressSuccess: false,
      progressError: false,
      status: 'acutecare',
      modalOpen: false,
      readmissionRisk: null,
    };
  },
  componentDidMount: function () {
    Client.getPatients((result) => {
      console.log(result);

      this.setState({
        fhirPatient: result.entry[0]
      });
    });
  },
  handleModalOkayClick:  function(e) {
      this.setState({
        modalOpen: false
      });
  },
  handleCardHeaderClick: function(e) {
      this.setState({
        modalOpen: true
      });
  },
  handleNotify: function(e) {
    Client.notify('Doc here, checking in!', (result) => {
      console.log(result);
    });
  },
  handleImportsClick: function(e) {
    const timeMultiplier = 2;
    setTimeout(() => {
      this.setState({
        progressLabel: 'Triaged',
        progressPercent: 30,
        progressWarning: true,
      });
      setTimeout(() => {
        this.setState({
          progressLabel: 'Discharged',
          progressPercent: 100,
          progressWarning: false,
          progressSuccess: true,
        });
          setTimeout(() => {
            this.setState({
              location: 'Tunnell Skilled Nursing & Rehabilitation Center',
              attending: 'Ming Tsing',
              pcp: null,
              etd: '11/01/19 (2 days)',
              status: 'subacutecare',
              progressLabel: 'Planned',
              progressPercent: 0,
              progressSuccess: false,
              progressWarning: true,
            });
            setTimeout(() => {
              this.setState({
                status: 'subacutecare',
                progressLabel: 'Arrived',
                progressPercent: 20,
                progressWarning: true,
              });

              setTimeout(() => {
                this.setState({
                  status: 'subacutecare',
                  progressLabel: 'Physical Therapy',
                  progressPercent: 50,
                  progressWarning: false,
                });

                setTimeout(() => {
                  this.setState({
                    status: 'subacutecare',
                    progressLabel: 'Discharged',
                    progressPercent: 100,
                    progressSuccess: true,
                    modalOpen: false,
                  });
                  setTimeout(() => {
                    this.setState({
                      status: 'subacutecare',
                      progressLabel: 'Discharged',
                      progressPercent: 100,
                      progressSuccess: true,
                      modalOpen: true,
                    });

                    setTimeout(() => {
                      this.setState({
                        location: 'Alegre Home Care',
                        attending: null,
                        pcp: null,
                        etd: 'TBD',
                        status: 'homehealth',
                        readmissionRisk: '20%',
                        progressLabel: 'Arrived',
                        progressPercent: 20,
                        progressSuccess: false,
                        progressWarning: true,
                        modalOpen: true,
                      });
                    }, 1500*timeMultiplier);
                  }, 1500*timeMultiplier);
                }, 1500*timeMultiplier);
              }, 500*timeMultiplier);
            }, 500*timeMultiplier);
          }, 1500*timeMultiplier);
      }, 1000*timeMultiplier);
    }, 500*timeMultiplier);
  },
  render: function () {
    let auxCard = () => (
      <Card color='blue'>
        <Card.Content>
          <Card.Header onClick={this.handleCardHeaderClick} >{this.state.patientName}</Card.Header>
          <Card.Meta>{this.state.dob}</Card.Meta>
          <Card.Description>
            <Progress percent={this.state.progressPercent}
              warning={this.state.progressWarning}
              error={this.state.progressError}
              success={this.state.progressSuccess} active>
              {this.state.progressLabel}
            </Progress>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          ETD: {this.state.etd} <br/>
          { this.state.attending && <span><Icon name='phone' /> Attending: {this.state.attending} <br/></span> }
          { this.state.pcp && 
            <span><Icon name='phone' /> PCP: {this.state.pcp} <br/></span>
          }
          <Icon name='marker' /> {this.state.location}<br/>

          { this.state.readmissionRisk &&
            <Dropdown text={`${this.state.readmissionRisk} re-admission risk`} icon='warning' floating labeled button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item>Send to EHR</Dropdown.Item>
                <Dropdown.Item>Call Emergency Contact</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        </Card.Content>
      </Card>
    );
    return (
      <div className='App'>
        <Grid>
          <Grid.Column color='black' floated='left' width={2} verticalAlign='top' className='sidebar'>
            <h1>HEALTHDASH</h1>
            <div className="navbar">
              <Image src={companyLogo} size='medium' />
              <Divider />
              <Button primary fluid onClick={this.handleImportsClick} icon><Icon name='dashboard' /></Button>
              <Button secondary fluid icon><Icon name='line graph' /></Button>
              <Button secondary fluid icon><Icon name='settings' /></Button>
            </div>
          </Grid.Column>
          <Grid.Column width={14} floated='right' verticalAlign='top'>
            <Menu size='massive' borderless>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
              <Menu.Item>
                <h4>Transitional Care Continuum</h4>
              </Menu.Item>

              <Menu.Menu position='right'>
                <Dropdown as={Menu.Item} text='Jacob the Care Coordinator (PCP)'>
                  <Dropdown.Menu>
                    <Dropdown.Item>Account</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Menu>
            <br/>

            <Grid columns={4} divided>
              <Grid.Column>
                <h2>Acute Care</h2>

                  <Card color='blue'>
                    <Card.Content>
                      <Card.Header>John Smith</Card.Header>
                      <Card.Meta>M, DOB 06/03/1942</Card.Meta>
                      <Card.Description>
                        <Progress percent={50} active>In Progress</Progress>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      ETD: 10/30/19 (4 days) <br/>
                      <Icon name='phone' /> Attending: Dr A. Pavel <br/>
                      <Icon name='phone' /> PCP: Dr X. Zhang <br/>
                      <Icon name='marker' /> UCSF Medical Center<br/>
                      <Label>Allergy <Label.Detail>Penicillin</Label.Detail></Label>

                    </Card.Content>
                  </Card>

                  {this.state.status === 'acutecare' ? auxCard() : null}

              </Grid.Column>
              <Grid.Column>
                <h2>Sub-Acute Care</h2>
                {this.state.status === 'subacutecare' ? auxCard() : null}

              </Grid.Column>
              <Grid.Column>
                <h2>Home Health</h2>
                <Card color='brown'>
                  <Card.Content>
                    <Card.Header>Bailey Ned</Card.Header>
                    <Card.Meta>M, DOB 04/12/1935</Card.Meta>
                    <Card.Description>
                      <Progress percent={0} warning>Pending Assessment</Progress>
                    </Card.Description>
                    <br/>
                    <Button onClick={this.handleNotify} basic color='red' animated='vertical' fluid>
                      <Button.Content visible>Check-up Call</Button.Content>
                      <Button.Content hidden>
                        <Icon name='call' />
                      </Button.Content>
                    </Button>
                  </Card.Content>
                  <Card.Content extra>
                    ETD: TBD <br/>
                    <Icon name='home' /> Alegre Home Care <br/>
                    <Icon name='marker' /> San Francisco <br/>
                  </Card.Content>
                </Card>
                {this.state.status === 'homehealth' ? auxCard() : null}
              </Grid.Column>
              <Grid.Column>
                <h2>Community</h2>
                { this.state.fhirPatient == undefined ?
                  <Loader active>Fetching FHIR resource</Loader>
                  :
                  <Card color='olive'>
                    <Card.Content>
                      <Card.Header>{_.get(this.state.fhirPatient, 'resource.name[0].given[0]')} {_.get(this.state.fhirPatient, 'resource.name[0].family')}</Card.Header>
                      <Card.Meta>M, DOB 12/25/1960</Card.Meta>
                      <Card.Description>
                        <Progress percent={50} active>Social Work Assistance</Progress>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      ETD: TBD <br/>
                      <Icon name='home' /> Alegre Community Center <br/>
                      <Icon name='marker' /> San Francisco <br/>
                    </Card.Content>
                  </Card>
                }
                {this.state.status === 'community' ? auxCard() : null}
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
        <Modal open={this.state.modalOpen}>
          <Modal.Header>{this.state.patientName} ({this.state.dob})</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Next Encounter Recommendation: Alegre Home Care</Header>
              <NextEncounterPrediction />

              <Divider />
              <AnalyticsStats />
              <Divider />
              <Header>History</Header>
                <Feed>
                  <Feed.Event>
                    <Feed.Label>
                      <Icon name='checkmark' />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Date>4 days ago</Feed.Date>
                      <Feed.Summary>
                        Discharged from UCSF Medical Center
                      </Feed.Summary>
                      <Feed.Extra>
                        <a href="">Diagnosis</a><br/>
                        <a href="">Treatment Rendered</a><br/>
                        <a href="">Disposition</a><br/>
                      </Feed.Extra>
                    </Feed.Content>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Label>
                      <Icon name='marker' />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Date>5 days ago</Feed.Date>
                      <Feed.Summary>
                        Arrived at UCSF Medical Center
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleModalOkayClick}>
              <Icon name='checkmark' /> Okay
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  },
});

export default App;
