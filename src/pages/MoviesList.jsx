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

const Update = styled.div`
color: #ef9b0f
cursor: pointer
font-size: 1rem
background: lightgray
width: 100px
margin: 0 auto`

const Delete = styled.div`
color: #ff0000
cursor: pointer
font-size: 1rem
border: 1px solid #ff0000
width: 100px
margin: 0 auto`

class UpdateMovie extends React.Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.movies[0].id}`
    }
    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends React.Component {

    deleteUser = event => {
        console.log(this.props.movies)
        event.preventDefault()
        
        if (
            window.confirm(
                `Do you want to delete the movie ${this.props.movies[0].name} permanently?`
                )
                ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }
    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class MoviesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            // columns: [],
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
        if (!movies.length) {
            showTable = false
        }

        console.log(movies)
        return (
            <Wrapper>

                {isLoading && (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )}

                {showTable && (
                    <Wrapper>

                        <UL>
                            {movies.map(movie => {
                                return (
                                    <div>
                                        <li>{movie.name}</li>
                                        {/* <li>{movie.time}</li> */}
                                        <UpdateMovie movies={movies}/>
                                        <DeleteMovie movies={movies}/>
                                    </div>
                                )
                            })}
                        </UL>

                    </Wrapper>
                )}
            </Wrapper>
        )
    }
}

export default MoviesList