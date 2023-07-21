import React, { useEffect, useState } from "react"
import type { ColumnsType } from 'antd/es/table'
import { Space, Tag, Avatar, Descriptions, Rate, Table, Row, Button, Select } from 'antd'
import moment from "moment"
import MovieDetails from '../../MockData/index.json'

interface DataType {
  key: string
  monthyear: string;
  day: string;
  title: string;
  poster: string;
  genre: string[];
  rating: [];
  year: string;
  release: string;
  metascore: string;
  imdbrating: string;
  runtime: string;
}

const Movies = () => {
  const [tableData, setTableData] = useState<any>([])
  const [fixTableData, setFixTableData] = useState<any>([])
  const [genreData, setGenreData] = useState<any>([])
  const [searchValue, setSearchValue] = useState<any>('')

  useEffect(() => {
    let genreList: any[] = []
    const movieList = MovieDetails.map((val, i) => {
      let monthYear = moment(val.date).format('MMMM YYYY')
      let day = moment(val.date).format('Do')
      let result = val.movies.map((movie, k) => {
        movie.genre.forEach(element => {
          if(!genreList.includes(element)) genreList.push(element)  
        })
        
        return {
          key: movie.imdb_id,
          monthyear: k === 0 ? monthYear: '',
          day: day,
          title: movie.title,
          poster: movie.poster,
          genre: movie.genre,
          rating: movie.Ratings,
          year: movie.year,
          release: movie.released,
          metascore: movie.meta_score,
          imdbrating: movie.imdb_rating,
          runtime: movie.runtime
      }
    })
      return result
    })
    const genreData = genreList.map(val => ({
      text: val,
      value: val,
    }))
    setTableData(movieList.flat())
    setFixTableData(movieList.flat())
    setGenreData(genreData)
  }, [])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Month',
      dataIndex: 'monthyear',
      key: 'monthyear',
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Space size="middle">
          <Avatar shape="square" size={100} src={record.poster} />
          {/* <img src={record.poster} width={10} height={10} alt="No Image" /> */}
          <h4>{record.title}</h4>
        </Space>
      ),
    },
    {
      title: 'Genre(s)',
      key: 'genre',
      dataIndex: 'genre',
      filters: genreData,
      render: (_, { genre }) => (
        <Space direction="vertical">
          {genre.map((g) => {
            return (
              <Tag color='blue' key={g}>
                {g.toUpperCase()}
              </Tag>
            );
          })}
        </Space>
      ),
      onFilter: (value: any, record) => record.genre.includes(value),
    },
    {
      title: 'Ratings',
      key: 'rating',
      dataIndex: 'rating',
      render: (_, record) => (
        <Descriptions bordered size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
          {record.rating.map((r:any) => {
            return <Descriptions.Item label={r.source}>{r.value}</Descriptions.Item>
          })}
        </Descriptions>
      ),
    },
    {
      title: 'Released',
      key: 'release',
      dataIndex: 'release',
    },
    {
      title: 'Metacritic Rating',
      key: 'metascore',
      dataIndex: 'metascore',
      render: (_, record) => (
        <>
          {record.metascore ? <Rate allowHalf disabled value={parseInt(record.metascore)/20} /> : 'N/A'}
        </>
      )
    },
    {
      title: 'Runtime',
      key: 'runtime',
      dataIndex: 'runtime',
    },
  ];

  const handleSearch = (newValue: string) => {
    const filteredData = fixTableData.filter((el: any) => {
      if(newValue === '') return el
      if (el.title.toLowerCase().includes(newValue.toLowerCase())) return el
    }).map((el:any) => el)
    setTableData(filteredData)
  };

  const handleChange = (newValue: string) => {
    setSearchValue(newValue)
  };

  const handleSelect = (newValue: string) => {
    const filteredData = fixTableData.filter((el: any) => {
      if(newValue === '') return  
      if (el.title.toLowerCase() === newValue.toLowerCase()) return el
    }).map((el:any) => el)
    setTableData(filteredData)
  }

  return (
    <div style={{ paddingTop: 24 }}>
      <Row>
        <Space>
          <Select
            showSearch
            value={searchValue}
            placeholder="Search By title"
            style={{width: 235}}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            onSelect={handleSelect}
            notFoundContent={null}
            options={(tableData || []).map((d:any) => ({
              value: d.title,
              label: d.title,
            }))}
          />
          <Button style={{ border: '1px solid #3253DC', color: '#3253DC', backgroundColor: '#F6F7FC'}} disabled={searchValue ? false: true } onClick={() => { setSearchValue(''); setTableData(fixTableData) }}>Reset</Button>
      </Space>
      </Row>
      <Row style={{paddingTop: 20}}>
        <Table style={{ width: '100%', border: '1px solid #3253DC' }} bordered columns={columns} dataSource={tableData} />
      </Row>
    </div>
  )
}

export default Movies;