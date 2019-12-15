import React from 'react'
// import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

// import 'react-table/react-table.css'

const Wrapper = styled.div`
padding: 0 40px 40px 40px`

const UL = styled.ul`
text-align: center
list-style: none
font-family: sans-serif
font-size: 2rem`

class MoviesList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMovies().then(movies => {

            this.setState({
                movies: movies.data.data,
                isLoading: false
            })
        })
    }

    render() {
        const { movies, isLoading } = this.state

        // const columns = [
        //     {
        //         Header: 'ID',
        //         accessor: '_id',
        //         filterable: true
        //     },
        //     {
        //         Header: 'Name', 
        //         accessor: 'name', 
        //         filterable: true
        //     },
        //     {
        //         Header: 'Time',
        //         accessor: 'time',
        //         Cell: props => <span>{props.value.join(' / ')}</span>
        //     }
        // ]

        let showTable = true
        if (!movies.length){
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                <Wrapper>

                    <UL>
                   {movies.map(movie => {
                       return <li>{movie.name}</li>
                })}
                </UL>

                </Wrapper>
                )}
            </Wrapper>
        )
    }
}

export default MoviesList