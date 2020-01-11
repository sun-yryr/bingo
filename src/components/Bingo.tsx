import React from 'react';
import styled from 'styled-components';
import {
    Card,
    CardContent,
    Button,
 } from '@material-ui/core';

interface State {
    hitNumber: Array<number>,
    allNumber: Array<boolean>,
    currentNumber?: number,
}

export class Bingo extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        const allNumber: Array<boolean> = Array(61).fill(false);
        this.state = {
            hitNumber : [],
            allNumber,
        }
        this.getNewNumber = this.getNewNumber.bind(this);
    }

    getNewNumber() {
        const { allNumber, hitNumber, currentNumber, ...other } = this.state;
        let n: number = 0;
        do {
            n = Math.floor( Math.random() * 60) + 1;
        } while (allNumber[n]);
        const newAll = allNumber.map((value) => value);
        newAll[n] = true;
        hitNumber.push(n);
        this.setState({
            ...other,
            allNumber: newAll,
            hitNumber,
            currentNumber: n,
        });
    }

    render() {
        const { hitNumber, currentNumber } = this.state;
        return (
            <Root>
                <GridTop>
                    <Card style={{
                        width: "300px",
                        height: "300px",
                        margin: "40px 100px",
                        backgroundColor: "azure",
                    }}>
                        <ExtendContent style={{padding: "0px"}}>
                            <P2>{currentNumber}</P2>
                        </ExtendContent>
                    </Card>
                    <ExtendButton
                        variant="contained"
                        onClick={this.getNewNumber}
                        style={{
                            fontSize: "xx-large",
                            fontWeight: 600,
                        }}
                    >
                        回す
                    </ExtendButton>
                </GridTop>
                <Grid>
                    {hitNumber.map((value) => (
                        <Card>
                            <ExtendContent style={{padding: "0px"}}>
                                <P3>{value}</P3>
                            </ExtendContent>
                        </Card>
                    ))}
                </Grid>
            </Root>
        )
    }
}

const Root = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-auto-rows: 100px;
    height: 80%;
    grid-gap: 10px;
    margin: 5px;
    justify-content: center;
`;

const ExtendContent = styled(CardContent)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const P2 = styled.p`
    font-weight: bolder;
    font-size: 200px;
    margin: 0;
`;

const P3 = styled.p`
    font-weight: 200;
    font-size: 60px;
    margin: 0;
`;

const GridTop = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
`;

const ExtendButton = styled(Button)`
    height: 80px;
    width: 200px;
`;