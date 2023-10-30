import { getAllTask } from '../../../redux/task/action'

const ListTask = () => {

    return (
        <>
            <Row>
                <Col className="mx-auto" lg={12}>
                    <Row>
                        <Col className="" lg={12}>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>

                                        <th> Description</th>
                                        <th> Summary</th>

                                        <th>Assignee</th>
                                        <th>Reporter</th>
                                        <th>Priority</th>
                                        <th> Start Date</th>
                                        <th> End Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getSingleSprintTask?.map((item, index) => (
                                        <tr>
                                            <td>{(skip - 1) * 5 + index + 1}</td>
                                            <td>{item?.summary}</td>
                                            <td>
                                                {' '}
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.description,
                                                    }}
                                                />
                                            </td>

                                            <td>{item?.assignees?.assigneeInfo?.userName}</td>
                                            <td>{item?.assignees?.reporterInfo?.role}</td>
                                            <td>
                                                {item?.priority == 1
                                                    ? 'High'
                                                    : '' || item?.priority == 2
                                                        ? 'Medium'
                                                        : '' || item?.priority == 3
                                                            ? 'Low'
                                                            : ''}
                                            </td>
                                            <td> {moment(item?.startDate).format('L')}</td>
                                            <td>{moment(item?.dueDate).format('L')}</td>
                                            <td>
                                                <Form.Check
                                                    type="switch"
                                                    checked={item?.activeStatus}
                                                    onChange={(e) => handleStatusChange(e, item)}
                                                />
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} className="d-flex justify-content-end mt-3">
                            {store?.getSigleSprintTask?.data?.totalPages > 0 && (
                                <Stack spacing={2}>
                                    <Pagination
                                        defaultPage={skip}
                                        count={store?.getSigleSprintTask?.data?.totalPages}
                                        color="primary"
                                        variant="outlined"
                                        onChange={handlePaginationChange}
                                    />
                                </Stack>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>

        </>
    )
}